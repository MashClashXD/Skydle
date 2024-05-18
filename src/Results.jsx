import React from "react";

import Result from "./Result";

const Results = ({ results, answerItem }) => {
  return (
    <section className="mt-4 row">
      {results.map((result, index) => {
        return <Result key={index} result={result} answerItem={answerItem} />;
      })}
    </section>
  );
};

export default Results;
