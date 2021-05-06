import React from "react";
import Box from "../../Components/Chart/Box/Box";
import Generator from "../Generator/Generator";

// assets
import spicy from "../../Assets/Images/spicy.png";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="home__title-container">
        <h1 className="home__title-container__title">Let's get spicy</h1>
        <img src={spicy} alt="spicy" className="home__title-container__logo" />
      </div>
      <p className="home__subtitle">Bacon Ipsum Generator</p>
      <Box>Hello</Box>
      <Generator />
    </div>
  );
};

export default Home;
