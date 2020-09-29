import React from "react";
import "./App.css";
import Note from "./Note/Note";

function App() {
  return (
    <div className="App">
      <header>Noteful</header>
      <div className="note-list">
        <Note />
      </div>
      <div className="folder-list"></div>
    </div>
  );
}

export default App;
