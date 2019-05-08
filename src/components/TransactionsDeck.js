import React from "react";
import "../css/transactions.css";
import CardUI from "./CardUI";
import charlieAPI from "../api/charlie";
import { Transition } from "react-spring/renderprops";

//helper
const totalTxns = txns => {
  let total = txns.reduce((total, txn) => txn.amount + total, 0);
  return total.toFixed(2);
};

class TransactionsDeck extends React.PureComponent {
  state = {
    view: "days",
    items: []
  };
  constructor(props) {
    super(props);
    console.log("constructor this.props.transactions", this.props);
  }

  componentDidUpdate(oldProps) {
    if (oldProps.transactions !== this.props.transactions) {
      switch (this.props.cardType) {
        case "day":
          const items = this.makeDays(this.props.transactions);
          this.setState({
            items: items
          });
          break;
        case "month":
          this.makeMonths().then(items => {
            console.log("results after", items);
            this.setState({
              items: items
            });
          });
          break;
        default:
          console.log("no cardType");
      }
    }
  }

  setHeaderFigures(arr) {
    const sumTotal = arr.reduce((sum, { total }) => sum + parseFloat(total), 0);
    const average = (sumTotal / arr.length).toFixed(2);
    this.props.setHeaderFigures({
      average: average,
      sumTotal: sumTotal.toFixed(2)
    });
  }

  async makeMonths(monthsNo) {
    const curDate = new Date();
    let monthCounter = curDate.getMonth();
    let yearCounter = curDate.getFullYear();
    const monthCards = [];
    for (let i = 0; i < this.props.cardCount; i++) {
      let month = monthCounter + 1;
      let result = await charlieAPI({
        //unable to make one API call for multiple months, otherwise I'd have done it in APP.js
        month: month,
        year: yearCounter,
        limit: 100,
        term: this.props.term
      });
      const date = new Date(yearCounter, month, 1); // 2009-11-10
      const monthStr = date.toLocaleString("en-us", { month: "long" });
      monthCards.push({
        date: monthStr + " " + yearCounter,
        txns: result,
        key: month,
        total: totalTxns(result)
      });
      if (monthCounter === 0) {
        monthCounter = 12;
        yearCounter--;
      }
      monthCounter--;
    }

    this.setHeaderFigures(monthCards);
    return monthCards;
  }

  makeDays = txns => {
    const dayMap = {}; //create a map where each day is the key and an array of its transactions is the value
    txns.forEach(txn => {
      if (dayMap[txn.date]) {
        //this doesn't check for missing days, ie. those without txns
        dayMap[txn.date].push(txn);
      } else {
        dayMap[txn.date] = [txn];
      }
    });
    const dayCards = [];
    Object.entries(dayMap).forEach(([day, dayTxns], index) => {
      const total = totalTxns(dayTxns);
      if (this.props.cardCount === 0 || this.props.cardCount > index) {
        dayCards.push({
          date: day,
          total: total,
          offsetTop: index,
          key: index,
          txns: dayTxns
        });
      }
    });
    console.log("dayCards", dayCards);
    this.setHeaderFigures(dayCards);
    return dayCards;
  };

  render() {
    const { items } = this.state;

    return (
      <div className="transactions-deck">
        <Transition
          items={items}
          keys={item => item.key}
          from={{ opacity: 0, marginTop: 1000 }}
          enter={{ opacity: 1, marginTop: 0 }}
          leave={{ opacity: 0, transform: "translate3d(1250px,1250px,-100px)" }}
          trail={500}
        >
          {item => props =>
            item && (
              <CardUI
                date={item.date}
                total={item.total}
                txns={item.txns}
                style={props}
                checkID={this.props.checkID}
              />
            )}
        </Transition>
      </div>
    );
  }
}

export default TransactionsDeck;
