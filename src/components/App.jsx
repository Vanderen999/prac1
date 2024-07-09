import DICE from "../images/icon-dice.svg";
import DIVIDER from "../images/pattern-divider-desktop.svg";
import { useState } from "react";

export const App = function () {
  const [p, ph] = useState("");
  const [n, nh] = useState("");

  function fetchAdvice() {
    let min = 0;
    let max = 140;

    let zeId = Math.floor(Math.random() * (max - min + 1)) + min;
    zeId.toString();
    console.log(zeId);
    // + `{"${zeId}"}`
    let request = "https:api.adviceslip.com/advice";
    let addOn = `/${zeId.toString()}`;
    fetch(request + addOn)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((parsedResponse) => {
        console.log(parsedResponse.slip.id);
        ph(parsedResponse.slip.advice);
        nh(parsedResponse.slip.id);
      });
  }
  return (
    <main>
      <div className="div1">
        <h1>ADVICE #{n}</h1>
        <p>"{p}"</p>
        <span>
          <img src={DIVIDER} alt={DIVIDER} />
        </span>
        <button onClick={fetchAdvice}>
          <img src={DICE} alt={DICE} />
        </button>
      </div>
    </main>
  );
};
