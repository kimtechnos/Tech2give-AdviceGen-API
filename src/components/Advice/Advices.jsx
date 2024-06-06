import React, { useState, useEffect } from "react";
import reload from "../../components/assets/reload.png";
import share from "../../components/assets/arrow.png";
import "./advice.css";

const Advices = () => {
  const [advices, setAdvices] = useState({
    text: "my first advice of the day",
  });

  const [advice, setAdvice] = useState([]);

  useEffect(() => {
    async function loadAdvice() {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      setAdvice((prev) => [...prev, data.slip.advice]);
    }
    loadAdvice();
  }, []);

  const random = () => {
    if (advice.length > 0) {
      const select = advice[Math.floor(Math.random() * advice.length)];
      setAdvices({ text: select });
    }
  };

  return (
    <div className="container">
      <div className="header">"InspireMe"</div>
      <div className="advice">{advices.text}</div>
      <div className="line"></div>
      <div className="bottom">
        <div className="icons">
          <img src={reload} onClick={random} alt="reload" />
          <img src={share} alt="share" />
        </div>
      </div>
    </div>
  );
};

export default Advices;
