import React from "react";
import HeaderGenerator from "../../Components/Generator/HeaderGenerator/HeaderGenerator";

// assets
import "./Generator.css";

const Generator = ({ paragraph, dispatch }) => {
  return (
    <div className="generator">
      <HeaderGenerator startWith={dispatch} />
      <div className="generator__content">{paragraph}</div>
    </div>
  );
};

export default Generator;
