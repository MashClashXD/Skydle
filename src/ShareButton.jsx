import React, { useEffect } from "react";
import ShareModal from "./ShareModal";
import { useState, useRef } from "react";

const ShareButton = ({ guessCount, guesses }) => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const handleShare = () => {
    setShowModal(true);
  };

  useEffect(() => {
    showModal ? modalRef.current.showModal() : modalRef.current.close();
  }, [showModal]);

  return (
    <section
      style={{ textAlign: "center", fontWeight: "bold", marginBottom: "20px" }}
    >
      <span
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "rgb(0, 123, 255)",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleShare}
        >
          Share Your Results!
        </button>
      </span>
      <ShareModal
        setShowModal={setShowModal}
        modalRef={modalRef}
        guessCount={guessCount}
        guesses={guesses}
      />
    </section>
  );
};

export default ShareButton;
