import React from "react";

// assets
import "./Box.css";

const Box = ({ children }) => {
  return (
    <div className="box">
      <div className="box__total">
        <p className="box__total__words">TOTAL WORDS: </p>
        <p className="box__total__characters">TOTAL CHARACTERS: </p>
      </div>
      <p className="box__title-chart">HISTOGRAM TOP 3 WORDS: </p>
      <div>{children}</div>
    </div>
  );
};

export default Box;
