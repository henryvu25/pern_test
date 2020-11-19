import React, { Fragment } from "react";
import './App.css';

//components

import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";

function App() { //the div contains components imported from the above locations
  return <Fragment> 
    <div className="container">
      <InputTodo/>
      <ListTodos/>
    </div>
    
  </Fragment>;
}

export default App;
