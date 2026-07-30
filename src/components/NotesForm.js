import React, { useState } from 'react';
import { addNote } from '../services/api';

function NotesForm({ id }) {
  const [note, setNote] = useState('');

  const handleAddNote = () => {
    if (!note.trim()) return;
    addNote(id, note)
      .then(() => {
        alert('Note added!');
        setNote('');
      })
      .catch(err => alert(err.response?.data?.error || 'Error adding note'));
  };

  return (
    <div className="note-form">
      <input
        className="note-input"
        type="text"
        placeholder="Add a note..."
        value={note}
        onChange={e => setNote(e.target.value)}
      />
      <button type="button" className="note-add-button" onClick={handleAddNote}>
        Add Note
      </button>
    </div>
  );
}

export default NotesForm;
