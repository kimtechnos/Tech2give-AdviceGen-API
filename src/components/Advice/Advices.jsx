import React, { useState, useEffect } from "react";
import reload from "../../components/assets/reload.png";
import share from "../../components/assets/arrow.png";
import ClipLoader from "react-spinners/ClipLoader";
import "./advice.css";

const Advices = () => {
  const [advices, setAdvices] = useState({
    text: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  const loadAdvice = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.adviceslip.com/advice");
      if (response.ok) {
        const data = await response.json();
        setAdvices({ text: data.slip.advice });
        setError(null);
        setLoading(false);
      } else {
        alert(`Could not generate a new advice: ${advices.text}`);
        setLoading(false);
      }
    } catch (error) {
      setError("Failed to fetch advice, check your internet connection");
      setAdvices({ text: "" });
      console.error("Error fetching advice:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdvice();
  }, []);

  return (
    <div className="container">
      <div className="header">"InspireMe"</div>
      <div className="advice">{advices.text}</div>
      <div className="error">{error}</div>
      <div className="line"></div>
      <div className="bottom">
        <div className="icons">
          <img src={reload} onClick={loadAdvice} alt="reload" />
          <img src={share} alt="share" />
        </div>
        <div className="loader">
          {loading && (
            <ClipLoader
              color={color}
              loading={loading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Advices;
