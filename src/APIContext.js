import React from "react";

export default React.createContext({
  notes: [],
  folders: [],
  newFolder: [],
  newNote: [],
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
  updateNewNoteData: () => {},
});
