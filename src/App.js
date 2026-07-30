import React from 'react';
import './App.css';
import WorkRequestList from './components/WorkRequestList';
import WorkRequestForm from './components/WorkRequestForm';

function App() {
  return (
    <div className="App">
      <div className="app-shell">
        <header className="app-header">
          <h1>Work Request Tracker</h1>
          <p className="app-tagline">A simple professional dashboard for tracking and filtering work requests.</p>
        </header>

        <main>
          <WorkRequestForm />
          <WorkRequestList />
        </main>
      </div>
    </div>
  );
}

export default App;
