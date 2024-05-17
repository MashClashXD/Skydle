import React from "react";

const Card = ({ title, value, correct, close }) => {
  return (
    <section
      className={
        correct
          ? "correct card large-card"
          : close
          ? "close card large-card"
          : "card large-card"
      }
      style={{ marginLeft: "22px" }}
    >
      <p className="card-header">{title}</p>
      <span className="card-body">
        <span className="card-text-container">
          <p className="card-text">{value}</p>
        </span>
      </span>
    </section>
  );
};

export default Card;
