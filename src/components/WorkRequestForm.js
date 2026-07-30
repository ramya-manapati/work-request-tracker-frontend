import React, { useState } from 'react';
import { createWorkRequest } from '../services/api';

function WorkRequestForm() {
  const [form, setForm] = useState({
    title: '', clientName: '', description: '',
    priority: 'Medium', status: 'New', dueDate: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    createWorkRequest(form)
      .then(() => {
        alert('Work request created!');
        setForm({ title: '', clientName: '', description: '', priority: 'Medium', status: 'New', dueDate: '' });
      })
      .catch(err => alert(err.response?.data?.error || 'Error'));
  };

  return (
    <section className="panel form-panel">
      <h2>Create Request</h2>
      <form onSubmit={handleSubmit} className="request-form">
        <div className="form-row">
          <input
            name="title"
            value={form.title}
            placeholder="Title"
            onChange={handleChange}
            required
          />
          <input
            name="clientName"
            value={form.clientName}
            placeholder="Client Name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row-full">
          <textarea
            name="description"
            value={form.description}
            placeholder="Description"
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <select name="status" value={form.status} onChange={handleChange}>
            <option>New</option>
            <option>InProgress</option>
            <option>Blocked</option>
            <option>Completed</option>
          </select>
          <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} required />
        </div>

        <div className="form-row-full">
          <button type="submit">Create Request</button>
        </div>
      </form>
    </section>
  );
}

export default WorkRequestForm;
