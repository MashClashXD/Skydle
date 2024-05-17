import React, { useCallback } from "react";

const ShareModal = ({ setShowModal, modalRef, guessCount, guesses }) => {
  const generateMessage = useCallback(
    (guesses) => {
      // Map the numbers in the grid to emojis
      const emojis = guesses.map((row) =>
        row.map((cell) => {
          switch (cell) {
            case 0:
              return "⬛";
            case 1:
              return "🟨";
            case 2:
              return "🟩";
          }
        })
      );
      return emojis;
    },
    [guessCount]
  );

  const handleCopyResults = () => {
    const clipboardString =
      `Skydle ${new Date().toLocaleString().split(",")[0]} ${guessCount}/10\n` +
      generateMessage(guesses)
        .map((row) => row.join(""))
        .join("\n");
    navigator.clipboard.writeText(clipboardString);
  };

  const handleShareSkydle = () => {
    const shareString =
      `Skydle ${new Date().toLocaleString().split(",")[0]} ${guessCount}/10\n` +
      generateMessage(guesses)
        .map((row) => row.join(""))
        .join("\n");
    navigator.share({
      title: "Skydle",
      text: "Play Skydle Now! https://alex-jando.github.io/Skydle",
    });
  };

  return (
    <dialog
      ref={modalRef}
      style={{
        backgroundColor: "#333333",
        border: "none",
        borderRadius: "10px",
        color: "white",
      }}
    >
      <h2>
        Skydle {new Date().toLocaleString().split(",")[0]} {guessCount}/10
      </h2>
      <hr />
      <p>
        {generateMessage(guesses).map((row, index) => (
          <span key={index}>
            {row}
            <br />
          </span>
        ))}
      </p>
      <hr />
      <button className="btn btn-light m-1" onClick={handleCopyResults}>
        Copy Results
      </button>
      <button className="btn btn-light m-1" onClick={handleShareSkydle}>
        Share Skydle
      </button>
      <hr />
      <button
        className="btn btn-danger"
        style={{ width: "100%" }}
        onClick={() => setShowModal(false)}
      >
        Close
      </button>
    </dialog>
  );
};

export default ShareModal;
