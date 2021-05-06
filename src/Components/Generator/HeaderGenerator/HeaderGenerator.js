import React from "react";

// assets
import "./HeaderGenerator.css";

const HeaderGenerator = ({ startWith }) => {
  return (
    <div className="header-generator">
      <div className="header-generator__paragraph-container">
        <p># PARAGRAPHS: </p>
        <input
          type="number"
          className="header-generator__paragraph-container__input"
        />
      </div>
      <div>
        <label htmlFor="lorem">STARTS WITH LOREM</label>
        <input type="checkbox" name="lorem" id="lorem" onChange={startWith} />
      </div>
      <button className="header-generator__btn">GENERATE!</button>
    </div>
  );
};

export default HeaderGenerator;
