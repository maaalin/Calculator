import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const et = expression.trim();

  const isOperator = (symbol) => {
    return /[+\-*/]/.test(symbol);
  };

  const handleInput = (e) => {
    var value = e.target.value;

    if (value === "AC") {
      setAnswer("");
      setExpression("0");
    } 
  
    else if (isOperator(value)) {
      setExpression(et + " " + value + " ");
    } else if (value === "=") {
      calculate();
    } else if (value === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + value);
      }
    } else if (value === ".") {
      const lastNumber = expression.split(/[+\-*/]/g).pop();
      if (!lastNumber) return;
      if (lastNumber?.includes(".")) return;
      setExpression(expression + value);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + value);
      } else {
        setExpression(expression + value);
      }
    }

  };

  const calculate = () => {
    if (isOperator(et.charAt(et.length - 1))) return;
    const parts = et.split(" ");
    const newParts = [];

    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression))
    } else {
      setAnswer(eval(newExpression));
    }
    setExpression("");
  };

  

   console.log("test");
   

  return (
    <>
    
       <div className="calculator">
        <div id="display">{answer || expression || "0"}</div>
        <div className="buttons">
          
          <input className="color-1" type="button" id="clear" onClick={handleInput} value="AC"/>
          <input className="color-2" type="button" id="divide" onClick={handleInput} value="/" />
          <input className="color-2" type="button" value="*" id="multiply" onClick={handleInput} />

          <input type="button" id="seven" onClick={handleInput} value="7" />
          <input type="button" id="eight" value="8" onClick={handleInput} />
          <input type="button" value="9" onClick={handleInput} id="nine" />
          <input className="color-2" type="button" value="-" id="subtract" onClick={handleInput} />

          <input type="button" value="4" id="four" onClick={handleInput} />
          <input type="button" value="5" id="five" onClick={handleInput} />
          <input type="button" value="6" id="six" onClick={handleInput} />
          <input className="color-2" type="button" value="+" id="add" onClick={handleInput} />
        
          <input type="button" value="1" id="one" onClick={handleInput} />
          <input type="button" value="2" id="two" onClick={handleInput} />
          <input type="button" value="3" id="three" onClick={handleInput} />
          
          <input type="button" value="0" id="zero" onClick={handleInput} />
          <input type="button" value="." id="decimal" onClick={handleInput} />
          <input className="color-2" type="button" value="=" id="equals" onClick={handleInput} />
          
        </div>
        </div> 
       
        
    </>
  )
  };


export default App
