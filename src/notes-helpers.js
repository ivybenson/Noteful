export const findFolder = (folders = [], folderid) =>
  folders.find((folder) => folder.id === folderid);

export const findNote = (notes = [], noteid) =>
  notes.find((note) => note.id === Number(noteid));

export const getNotesForFolder = (notes = [], folderid) =>
  !folderid
    ? notes
    : notes.filter((note) => Number(note.folderid) === Number(folderid));

export const countNotesForFolder = (notes = [], folderid) =>
  notes.filter((note) => Number(note.folderid) === Number(folderid)).length;
