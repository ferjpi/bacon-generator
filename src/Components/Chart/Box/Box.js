import React from "react";

// assets
import "./Box.css";

const Box = ({ data, children }) => {
  return (
    <div className="box">
      <div className="box__total">
        <p className="box__total__words">TOTAL WORDS: {data.totalWords}</p>
        <p className="box__total__characters">
          TOTAL CHARACTERS: {data.totalCharacters}
        </p>
      </div>
      <p className="box__title-chart">HISTOGRAM TOP 3 WORDS: </p>
      <div className="box__chart">{children}</div>
    </div>
  );
};

export default Box;
