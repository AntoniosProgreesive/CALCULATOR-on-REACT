import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(0);

  const handleClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const clearInput = () => {
    setInput("");
    setResult(0);
  };

  // Ασφαλής συνάρτηση υπολογισμού
  const calculateResult = () => {
    const sanitizedInput = sanitizeInput(input);
    if (sanitizedInput) {
      const calculation = compute(sanitizedInput);
      setResult(calculation);
      setInput("");
    } else {
      setResult("Error");
    }
  };

  // Συνάρτηση που αφαιρεί μη έγκυρους χαρακτήρες από την έκφραση
  const sanitizeInput = (expression) => {
    return expression.match(/^[\d+\-*/.() ]+$/) ? expression : null;
  };

  // Λογική για τον υπολογισμό της έκφρασης χωρίς τη χρήση eval
  const compute = (expression) => {
    try {
      // Χρησιμοποιούμε τη συνάρτηση Function για ασφαλή αξιολόγηση
      const func = new Function("return " + expression);
      return func();
    } catch (error) {
      return "Error";
    }
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="result">{result}</div>
        <div className="input">{input || "0"}</div>
      </div>
      <div className="buttons">
        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button onClick={() => handleClick("+")}>+</button>
        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button onClick={() => handleClick("-")}>-</button>
        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("*")}>*</button>
        <button onClick={() => handleClick("0")}>0</button>
        <button onClick={clearInput}>C</button>
        <button onClick={() => handleClick("/")}>/</button>
        <button onClick={calculateResult}>=</button>
      </div>
    </div>
  );
}

export default App;
