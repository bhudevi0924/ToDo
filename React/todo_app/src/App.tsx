import React from 'react';  
import './App.css';
import ToDoList from './components/ToDoList';

function App() {
  const logo = require("./logo.svg") as string;
  return (
    <div className="App">
      <ToDoList />
    </div>
  );
}

export default App;
