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
      return {
        ...state,
        startWith: action.payload ? "&start-with-lorem=1" : "",
      };
    case "paragraph":
      return { ...state, paras: action.payload };
    default:
      break;
  }
};

const initialState = {
  status: "idle",
  data:
    "Spicy jalapeno bacon ipsum dolor amet tenderloin cow spare ribs cupim, ham short ribs ribeye alcatra biltong ham hock. Pig ribeye kielbasa tri-tip, kevin biltong swine drumstick chicken t-bone. Meatloaf kielbasa frankfurter t-bone, pork chop leberkas buffalo pork belly swine. Rump meatball t-bone salami kevin brisket cupim landjaeger. Beef ribs spare ribs jerky bacon rump. Corned beef flank tail, tongue beef ribs ball tip t-bone meatloaf.",
  words: [],
  error: null,
  paras: 1,
  startWith: "",
  isLoading: false,
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

  /**
   * Function that get the top 3 words more used.
   *
   * The computational complexity is O(n)
   */
  const getWords = (text) => {
    // initialize the variables
    let max1 = 0;
    let max2 = 0;
    let max3 = 0;
    let word1 = "";
    let word2 = "";
    let word3 = "";

    // map the words
    let mapWords = {};

    // split text and return an array
    let arr = text.split(" ");

    // iterate over the elements of the array (word)
    for (let x of arr) {
      if (!x.length) continue; // if text is empty

      if (mapWords[x] === undefined) mapWords[x] = 1;
      // initialize map
      else {
        // increment the value of the word
        mapWords[x] += 1;

        // if word if grader than the variable
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

    // return the result
    return { max1, word1, max2, word2, max3, word3 };
  };

  /**
   * Get the text and return an object
   * with the total words in the text and
   * the number of characters
   *
   *
   */
  const manipulateData = useCallback((text) => {
    // initialize the variables
    let totalWords = 0;
    let totalCharacters = 0;

    // split the text and return an array of words
    let arrOfWords = text.split(" ");

    // Number of words
    totalWords = arrOfWords.length;

    // join the words without space
    let longString = arrOfWords.join("");

    // count the number of characters
    totalCharacters = longString.length;

    /**
     * call the function that is going to
     * find the top 3 words.
     *
     * Return an object
     */
    const words = getWords(text);

    // return the result
    return {
      totalWords,
      totalCharacters,
      words,
    };
  }, []);

  const handleSubmit = async () => {
    let reJson = await fetch(
      `https://baconipsum.com/api/?type=all-meat&paras=${state.paras}${state.startWith}`
    );
    let res = await reJson.json();

    const result = extractText(res);
    const words = manipulateData(result);

    dispatchState({ type: "load-data", payload: { data: result, words } });
  };

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
        onClick={() => handleSubmit()}
        dispatch={(e) => dispatchState(e)}
      />
    </div>
  );
};

export default Home;
