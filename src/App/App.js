import React, { Component } from "react";
import "./App.css";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Note from "../Note/Note";
import FoldersFile from "../FoldersFile/FoldersFile";
import SideBar from "../SideBar/SideBar";
import dummyStore from "../dummy-store";

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    setTimeout(() => this.setState(dummyStore), 600);
  }

  renderMain() {
    const { notes, folders } = this.state;
    return <Route />;
  }

  render() {
    return (
      <div className="App">
        <nav></nav>
        <header>
          <h1>
            <Link to="/">Noteful</Link>
            <FontAwesomeIcon icon="check-double" />
          </h1>
        </header>
        <main className="App__main">{this.renderMain()}</main>
      </div>
    );
  }
}

export default App;
