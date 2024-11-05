import React, { useState, useEffect} from "react";
import Note from "./Note";
import NoteForm from "./NoteForm";
import { fetchNotes, editNote, createNote, deleteNote } from "./services/api";

const MainContent = ({ onLogout }) => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(
    { id: null, title: "", content: "" }
  );

  const fetchNotes$ = () => {
    fetchNotes().then(res => {
      setNotes(res);
    })
  };

  const clearCurrentNote = () => {
    setCurrentNote({ id: null, title: "", content: "" });
  };

  useEffect(() => {
    fetchNotes$()
  }, []);

  const handleCreateOrUpdate = (note) => {
    if (note.id) {
      handleEdit(note).then(fetchNotes$);
    } else {
      createNote(note).then(fetchNotes$);
    }
    clearCurrentNote();
  };

  const handleEdit = (note) => {
    editNote(note).then(fetchNotes$)
  };

  const handleDelete = (id) => {
    deleteNote(id).then(fetchNotes$);
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Note Like Us</h1>
      <p className="text-center mt-3">
        <button className="btn btn-link" onClick={onLogout}>Logout</button>
      </p>
      <div className="row">
        <div className="col-md-12 mb-4">
          <NoteForm note={currentNote} onCreateOrUpdate={handleCreateOrUpdate} />
        </div>
        <div className="col-md-12">
          {notes.map((note) => (
            <Note
              key={note.id}
              note={note}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainContent;
