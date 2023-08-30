// import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber]=useState(0);
  return (
    <div className="App">
      <header className="App-header">
        React js
        <br/>
        {number}
        <br/>
        <button onClick={()=>setNumber(number+1)}> add number</button>
        <br/>
        <button onClick={()=>setNumber(number-1)}> min number</button>
       
      </header>
    </div>
  );
}

export default App;
