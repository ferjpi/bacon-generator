import React from "react";
import HeaderGenerator from "../../Components/Generator/HeaderGenerator/HeaderGenerator";

// assets
import "./Generator.css";

const Generator = ({ paragraph, dispatch, onClick }) => {
  return (
    <div className="generator">
      <HeaderGenerator dispatch={dispatch} onClick={onClick} />
      <div className="generator__content">{paragraph}</div>
    </div>
  );
};

export default Generator;
