import React, { useEffect, useState } from 'react';
import { getWorkRequests, updateStatus, addNote } from '../services/api';
import StatusFilter from './StatusFilter';
import SearchBar from './SearchBar';

function WorkRequestList() {
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [noteDrafts, setNoteDrafts] = useState({});

  // Load requests whenever filter/search changes
  useEffect(() => {
    fetchRequests();
  }, [status, search]);

  const fetchRequests = () => {
    getWorkRequests(status, search)
      .then(res => setRequests(res.data))
      .catch(err => console.error(err));
  };

  const handleNoteChange = (id, value) => {
    setNoteDrafts(prev => ({ ...prev, [id]: value }));
  };

  const getStatusKey = (status) => {
    const value = status == null ? 'unknown' : String(status);
    return value.toLowerCase().replace(/\s+/g, '');
  };

  const getStatusLabel = (status) => {
    if (status == null) return 'Unknown';
    return String(status);
  };

  const getNoteText = (note) => {
    if (note == null) return '';
    if (typeof note === 'string') return note;
    if (typeof note === 'object') return note.content ?? note.text ?? note?.note ?? JSON.stringify(note);
    return String(note);
  };

  // PATCH: update status
  const handleStatusChange = (id, newStatus) => {
    updateStatus(id, newStatus)
      .then(() => {
        alert('Status updated!');
        fetchRequests();
      })
      .catch(err => alert(err.response?.data?.error || 'Error updating status'));
  };

  // POST: add note
  const handleAddNote = (id) => {
    const note = (noteDrafts[id] || '').trim();
    if (!note) return;

    addNote(id, note)
      .then(() => {
        alert('Note added!');
        setNoteDrafts(prev => ({ ...prev, [id]: '' }));
        fetchRequests();
      })
      .catch(err => alert(err.response?.data?.error || 'Error adding note'));
  };

  return (
    <section className="panel list-panel">
      <div className="panel-heading">
        <h2>Work Requests</h2>
        <p className="panel-copy">
          Filter work requests by status or search by title and client.
        </p>
      </div>

      <div className="list-actions">
        <SearchBar onSearch={setSearch} />
        <StatusFilter onFilter={setStatus} />
      </div>

      <div className="table-wrapper">
        <table className="request-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Client</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(r => (
              <tr key={r.id}>
                <td>{r.title}</td>
                <td>{r.clientName}</td>
                <td>{r.priority}</td>
                <td>
                  <div className="status-cell">
                    <span className={`status-badge status-${getStatusKey(r.status)}`}>
                      {getStatusLabel(r.status)}
                    </span>
                    <select
                      className="status-select"
                      value={r.status || ''}
                      onChange={e => handleStatusChange(r.id, e.target.value)}
                    >
                      <option value="New">New</option>
                      <option value="InProgress">InProgress</option>
                      <option value="Blocked">Blocked</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </td>
                <td>{new Date(r.dueDate).toLocaleDateString()}</td>
                <td>
                  <div className="note-cell">
                    <input
                      className="note-input"
                      type="text"
                      placeholder="Add a note"
                      value={noteDrafts[r.id] || ''}
                      onChange={e => handleNoteChange(r.id, e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddNote(r.id);
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="note-add-button"
                      onClick={() => handleAddNote(r.id)}
                    >
                      Add
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default WorkRequestList;
