import React from "react";
import config from "../config";
import ApiContext from "../APIContext";
import "./AddNote.css";

export default class AddNote extends React.Component {
  static contextType = ApiContext;

  addNewNote = (note) => {
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.API_TOKEN}`,
      },
      body: JSON.stringify(note),
    })
      .then((res) => {
        return res.json();
      })
      .then((resJson) => this.context.handleAddNote(resJson))
      .catch((error) => {
        console.error(error);
      });
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
      title: this.context.newNote.name.value,
      content: this.context.newNote.content.value,
      folderid: this.context.newNote.folderid.value,
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
            {this.context.newNote.name.touched && <p>{this.validateName()}</p>}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name your note!"
            aria-required="true"
            aria-label="Name"
            onChange={(e) =>
              this.context.updateNewNoteData(e.target.name, e.target.value)
            }
          />
          <label>
            Content
            {this.context.newNote.content.touched && (
              <p>{this.validateNote()}</p>
            )}
          </label>
          <input
            type="text"
            name="content"
            id="content"
            placeholder="New note here."
            required
            aria-required="true"
            aria-label="note-content"
            onChange={(e) =>
              this.context.updateNewNoteData(e.target.name, e.target.value)
            }
          />
          <label>Select a Folder For New Note</label>
          <select
            name="folderid"
            id="folderid"
            aria-required="true"
            aria-label="folder-selections"
            required
            onChange={(e) =>
              this.context.updateNewNoteData(e.target.name, e.target.value)
            }
          >
            <option value="">Select Folder....</option>
            {this.parseFolders()}
          </select>
          <button
            type="submit"
            disabled={this.validateName() || this.validateNote()}
          >
            Submit New Note
          </button>
        </form>
      </>
    );
  }
}
