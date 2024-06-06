import React, { useState, useEffect } from "react";
import reload from "../../components/assets/reload.png";
import share from "../../components/assets/arrow.png";
import "./advice.css";

const Advices = () => {
  const [advices, setAdvices] = useState({
    text: "my first advice of the day",
  });

  const loadAdvice = async () => {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    setAdvices({ text: data.slip.advice });
  };

  useEffect(() => {
    loadAdvice();
  }, []);

  return (
    <div className="container">
      <div className="header">"InspireMe"</div>
      <div className="advice">{advices.text}</div>
      <div className="line"></div>
      <div className="bottom">
        <div className="icons">
          <img src={reload} onClick={loadAdvice} alt="reload" />
          <img src={share} alt="share" />
        </div>
      </div>
    </div>
  );
};

export default Advices;
