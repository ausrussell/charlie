import React, { useState, useEffect } from "react";
import { Card } from "semantic-ui-react";
import Transaction from "./Transaction";
import { useSpring, animated } from "react-spring";

const CardUI = props => {
  const { date, total, id, style, txns, checkID } = props;
  const [open, set] = useState(false); //using a hook
  const clickHandler = open => {
    set(open => !open);
  };
  useEffect(() => {
    return () => {
      set(open => false);
    };
  }, []);
  const txnsProps = useSpring({
    to: { position: open ? "relative" : "absolute" },
    from: {
      position: open ? "relative" : "absolute"
    }
  });
  const wrapperProps = useSpring({
    position: open ? "initial" : "absolute",
    height: open ? "auto" : 1000
  });
  const divStyle = style;
  return (
    <Card className="time-card time" style={divStyle} key={id}>
      <Card.Content>
        <Card.Header onClick={clickHandler}>
          {date}
          <div className="card-header-total">${total}</div>
        </Card.Header>
      </Card.Content>
      <animated.div className="transactions-wrapper" style={wrapperProps}>
        <animated.div className="transactions-holder" style={txnsProps}>
          {txns.map(item => {
            return (
              <Transaction
                key={item.id}
                id={item.id}
                name={item.name}
                amount={item.amount}
                category={item.category}
                account_name={item.account_name}
                checkID={checkID}
              />
            );
          })}
        </animated.div>
      </animated.div>
    </Card>
  );
};

export default CardUI;
