export const findFolder = (folders = [], folderId) =>
  folders.find((folder) => folder.id === folderId);

export const findNote = (notes = [], noteid) =>
  notes.find((note) => note.id === noteid);

export const getNotesForFolder = (notes = [], folderId) =>
  !folderId
    ? notes
    : notes.filter((note) => Number(note.folderid) === Number(folderId));

export const countNotesForFolder = (notes = [], folderId) =>
  notes.filter((note) => Number(note.folderid) === Number(folderId)).length;
