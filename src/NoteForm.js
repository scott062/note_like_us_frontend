import React, { useState, useEffect } from "react";

const NoteForm = ({ note, onCreateOrUpdate }) => {
  const [formData, setFormData] = useState({ title: "", content: "" });

  useEffect(() => {
    setFormData(note);
  }, [note]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData?.title || !formData?.content) return;
    onCreateOrUpdate(formData);
    setFormData({ title: "", content: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={formData?.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Content</label>
        <textarea
          name="content"
          className="form-control"
          rows="3"
          value={formData?.content}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary w-100">
        {note?.id ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
}

export default NoteForm;

