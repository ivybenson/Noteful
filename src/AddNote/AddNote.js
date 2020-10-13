import React from "react";
import config from "../config";
import ApiContext from "../APIContext";
import "./AddNote.css";

export default class AddNote extends React.Component {
  static contextType = ApiContext;

  addNewNote = (note) => {
    note.modified = new Date(note.modified);
    console.log(note.modified);

    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((res) => {
        console.log(JSON.stringify(note));
        return res.json();
      })
      .then((resJson) => this.context.handleAddNote(resJson));
  };

  parseFolders = () => {
    return this.context.folders.map((folder) => (
      <option key={folder.id} name={folder.id} value={folder.id}>
        {folder.name}
      </option>
    ));
  };

  handleFormSubmit = (e) => {
    e.preventDefault(e);
    const newNote = {
      name: e.target.name.value,
      content: e.target.content.value,
      folder_id: e.target.folders.value,
      modified: new Date(),
    };
    console.log(newNote);
    this.addNewNote(newNote);
    this.props.history.push("/");
  };

  validateName = () => {
    if (this.context.newNote.name.value.length === 0) {
      return "Please add name.";
    }
  };

  validateNote = () => {
    if (this.context.newNote.content.value.length === 0) {
      return "Please add note.";
    }
  };

  render() {
    console.log(this.context);
    return (
      <>
        <header>
          <h2>Add Note</h2>
        </header>
        <form
          className="add-note-form"
          onSubmit={(e) => this.handleFormSubmit(e)}
        >
          <label htmlFor="name">
            Name
            {/* {this.context.addNote.name.touched && <p>{this.validateName}</p>} */}
          </label>
          <input
            type="text"
            name="newNoteName"
            id="newNoteName"
            placeholder="Name your note!"
            aria-required="true"
            aria-label="Name"
            onChange={(e) =>
              this.context.updateNewNoteData(e.target.name, e.target.value)
            }
          />
          <label>
            Note
            {/* {this.context.newNote.content.touched && <p>{this.validateNote}</p>} */}
          </label>
          <input
            type="text"
            name="content"
            id="content"
            placeholder="New note here."
            aria-required="true"
            aria-label="note-content"
            onChange={(e) =>
              this.context.updateNewNoteData(e.target.name, e.target.value)
            }
          />
          <label>Select a Folder For New Note</label>
          <select
            name="folders"
            id="folders"
            aria-required="true"
            aria-label="folder-selections"
          >
            {this.parseFolders()}
          </select>
          <button type="submit">Submit New Note</button>
        </form>
      </>
    );
  }
}
