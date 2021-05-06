import React from "react";

// assets
import "./HeaderGenerator.css";

const HeaderGenerator = ({ dispatch, onClick }) => {
  return (
    <div className="header-generator">
      <div className="header-generator__paragraph-container">
        <p># PARAGRAPHS: </p>
        <input
          type="number"
          className="header-generator__paragraph-container__input"
          onChange={(e) =>
            dispatch({ type: "paragraph", payload: e.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="lorem">STARTS WITH LOREM</label>
        <input
          type="checkbox"
          name="lorem"
          id="lorem"
          onChange={(e) =>
            dispatch({ type: "start-with", payload: e.target.checked })
          }
        />
      </div>
      <button className="header-generator__btn" onClick={onClick}>
        GENERATE!
      </button>
    </div>
  );
};

export default HeaderGenerator;
