import React, { Component } from "react";
import charlieAPI from "./api/charlie";
import Header from "./components/Header";
import TransactionsDeck from "./components/TransactionsDeck";
import "./css/main.css";

class App extends Component {
  state = {
    transactions: [],
    cardType: "day", // month
    term: "",
    average: 0,
    sumTotal: 0,
    checkID: 0 //txn id to focus on
  };

  componentDidMount() {
    this.onFormSubmit(); //comment out to start blank
  }

  onFormSubmit = term => {
    charlieAPI({ term: term }).then(data => {
      this.setState({
        cardType: "day",
        transactions: data,
        cardCount: 0,
        term: term,
        checkID: 0
      });
      console.log("data:", data);
    });
  };

  onStorySelect = storyValue => {
    console.log("onStorySelect", storyValue);
    switch (parseInt(storyValue)) {
      case 1:
        console.log("1");
        this.setState({
          cardType: "month",
          cardCount: 6,
          term: "Walmart",
          showHero: true,
          transactions: {}
        });
        break;
      case 2:
        console.log("2");
        this.setState({
          cardType: "day",
          cardCount: 7,
          term: "Weekly Summary",
          showHero: true
        });
        charlieAPI({ term: "", limit: 500 }).then(data => {
          this.setState({ transactions: data });
        });

        break;
      case 3:
        console.log("3");
        this.setState({
          cardType: "day",
          cardCount: 1,
          term: "Transaction check",
          showHero: true,
          checkID: 176803733
        });
        charlieAPI({ term: "", offset: 11 }).then(data => {
          this.setState({ transactions: data });
        });

        break;
      default:
        console.log("no story", storyValue);
    }
  };
  setHeaderFigures = ({ average, sumTotal }) => {
    console.log("setAverage", average);
    this.setState({ average: average, sumTotal: sumTotal });
  };

  render() {
    const {
      cardType,
      cardCount,
      term,
      showHero,
      average,
      sumTotal,
      checkID
    } = this.state;
    return (
      <div className="body">
        <Header
          onSubmit={this.onFormSubmit}
          onStorySelect={this.onStorySelect}
          cardType={cardType}
          cardCount={cardCount}
          title={term}
          showHero={showHero}
          average={average}
          sumTotal={sumTotal}
          checkID={checkID}
        />
        <TransactionsDeck
          transactions={this.state.transactions}
          cardType={cardType}
          cardCount={cardCount}
          term={term}
          checkID={checkID}
          setHeaderFigures={this.setHeaderFigures}
        />
      </div>
    );
  }
}

export default App;
