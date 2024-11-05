import React, { useState } from "react";
import NoteForm from "./NoteForm";

const Note = ({ note, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleFormSubmit = (updatedNote) => {
    setIsEditing(false);
    onEdit(updatedNote);
  };

  return (
    <div className="card bg-light mb-3">
      <div className="card-body">
        {isEditing ? (
          <NoteForm note={note} onCreateOrUpdate={handleFormSubmit} />
        ) : (
          <>
            <h5 className="card-title">{note?.title}</h5>
            <p className="card-text">{note?.content}</p>
            <button className="btn btn-warning btn-sm me-2" onClick={handleEditClick}>
              Edit
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(note?.id)}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Note;

