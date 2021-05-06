import React, { useCallback, useEffect, useReducer } from "react";
import Box from "../../Components/Chart/Box/Box";
import Generator from "../Generator/Generator";
import ChartComponent from "../Chart/ChartComponent";

// assets
import spicy from "../../Assets/Images/spicy.png";
import "./Home.css";

const homeReducer = (state, action) => {
  switch (action.type) {
    case "load-data":
      return {
        ...state,
        status: "success",
        data: action.payload.data,
        words: action.payload.words,
        error: null,
      };
    case "start-with":
      let defaultUrl = "all-meat";

      if (action.payload) defaultUrl = "meat-and-filler";
      return { ...state, startWith: defaultUrl };
    default:
      break;
  }
};

const initialState = {
  status: "idle",
  data: null,
  words: [],
  error: null,
  isLoading: false,
  startWith: "all-meat",
};

const Home = () => {
  const [state, dispatchState] = useReducer(homeReducer, initialState);

  const extractText = (arr) => {
    if (arr === undefined || !arr.length) return "There are no text";

    let text = "";

    for (let t of arr) {
      text += t;
    }

    return text;
  };

  const getWords = (text) => {
    let max1 = 0;
    let max2 = 0;
    let max3 = 0;
    let word1 = "";
    let word2 = "";
    let word3 = "";

    let mapWords = {};

    let arr = text.split(" ");

    for (let x of arr) {
      if (!x.length) continue;
      if (mapWords[x] === undefined) mapWords[x] = 1;
      else {
        mapWords[x] += 1;
        if (mapWords[x] > max1) {
          max1 = mapWords[x];
          word1 = x;
        } else if (mapWords[x] > max2) {
          max2 = mapWords[x];
          word2 = x;
        } else if (mapWords[x] > max3) {
          max3 = mapWords[x];
          word3 = x;
        }
      }
    }

    return { max1, word1, max2, word2, max3, word3 };
  };

  const manipulateData = useCallback((text) => {
    let totalWords = 0;
    let totalCharacters = 0;

    let arrOfWords = text.split(" ");

    totalWords = arrOfWords.length;

    let longString = arrOfWords.join("");

    totalCharacters = longString.length;

    const words = getWords(text);

    return {
      totalWords,
      totalCharacters,
      words,
    };
  }, []);

  const fetchData = useCallback(async () => {
    let res = await await (
      await fetch(`https://baconipsum.com/api/?type=${state.startWith}`)
    ).json();

    const result = extractText(res);
    const words = manipulateData(result);

    dispatchState({ type: "load-data", payload: { data: result, words } });
  }, [state.startWith, manipulateData]);

  useEffect(() => {
    fetchData();
  }, [fetchData, state.startWith]);

  useEffect(() => {
    console.log("state.words: ", state.words);
  }, [state.words]);

  return (
    <div className="home">
      <div className="home__title-container">
        <h1 className="home__title-container__title">Let's get spicy</h1>
        <img src={spicy} alt="spicy" className="home__title-container__logo" />
      </div>
      <p className="home__subtitle">Bacon Ipsum Generator</p>
      <Box data={state.words}>
        <ChartComponent data={state.words} />
      </Box>
      <Generator
        paragraph={state.data}
        // data={state.words}
        dispatch={(e) =>
          dispatchState({ type: "start-with", payload: e.target.checked })
        }
      />
    </div>
  );
};

export default Home;
