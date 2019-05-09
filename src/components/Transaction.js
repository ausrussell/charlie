import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { Button, Icon } from "semantic-ui-react";
const Transaction = txn => {
  const { id, name, amount, category, account_name, checkID } = txn;
  const [open, set] = useState(() => {
    const initialState = id === checkID;
    return initialState;
  });

  const [checkStyle, setCheckStyle] = useState(
    id === checkID
      ? {
          boxShadow: "5px 5px 5px 0px rgba(0, 0, 0, 0.75)",
          transform: "scale(1.05)",
          background: "#fefefe",
          border: "1px solid #eee"
        }
      : {}
  ); //using a hook

  const txnProps = useSpring({
    from: {},
    to: {
      transform: open
        ? "rotateX(0deg) translateZ(0em)"
        : "rotateX(-75deg) translateZ(2em)",
      marginTop: open ? 0 : -30,
      color: open ? "#676" : "transparent",
      backgroundImage: open ? "none" : "linear-gradient(to bottom, #ccc, #fff)"
    }
  });

  return (
    <div
      className="transaction-unit"
      key={"key" + id}
      onClick={() => {
        set(open => !open);
        setCheckStyle(checkStyle => {});
      }}
      style={checkStyle}
    >
      <div className="transaction-holder-main">
        <div className="transaction-merchant">{name}</div>
        {amount > 0 ? (
          <div className="transaction-amount">${amount}</div>
        ) : (
          <div className="transaction-amount card-deposit">${amount * -1}</div>
        )}
      </div>
      <div className="transaction-detail-wrapper">
        <animated.div className="transaction-holder-detail" style={txnProps}>
          <div>
            Category: {category}
            <div className="transaction-account_name">
              Account: {account_name}
            </div>
          </div>
          <div className="transaction-button">
            <Button size="mini" basic color="green">
              <Icon name="bullseye" />
              Target
            </Button>
          </div>
        </animated.div>
      </div>
    </div>
  );
};

export default Transaction;
