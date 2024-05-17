import React from "react";
import Results from "./Results";

const Answer = ({ answerItem }) => {
  return <Results results={[{ ...answerItem }]} answerItem={answerItem} />;
};

export default Answer;
