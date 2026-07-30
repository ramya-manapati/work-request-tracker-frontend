import React, { useState } from 'react';
import { updateStatus } from '../services/api';

function StatusUpdate({ id, currentStatus, onUpdated }) {
  const [status, setStatus] = useState(currentStatus);

  const handleUpdate = () => {
    updateStatus(id, status)
      .then(() => {
        alert('Status updated!');
        onUpdated();
      })
      .catch(err => alert(err.response?.data?.error || 'Error updating status'));
  };

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option>New</option>
        <option>InProgress</option>
        <option>Blocked</option>
        <option>Completed</option>
      </select>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default StatusUpdate;
