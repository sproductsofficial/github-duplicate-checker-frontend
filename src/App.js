// src/App.js

import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [repo1, setRepo1] = useState('');
  const [repo2, setRepo2] = useState('');
  const [differences, setDifferences] = useState([]);

  const handleCompare = async () => {
    try {
      const response = await axios.get(`https://github-duplicate-checker-backend.vercel.app/api/compare?repo1=${encodeURIComponent(repo1)}&repo2=${encodeURIComponent(repo2)}`);
      setDifferences(response.data.differences);
    } catch (error) {
      console.error('Error fetching differences:', error);
      setDifferences([]);
    }
  };

  return (
    <div className="App">
      <h1>GitHub Duplicate Checker</h1>
      <div>
        <label>Repository 1:</label>
        <input type="text" value={repo1} onChange={(e) => setRepo1(e.target.value)} />
      </div>
      <div>
        <label>Repository 2:</label>
        <input type="text" value={repo2} onChange={(e) => setRepo2(e.target.value)} />
      </div>
      <button onClick={handleCompare}>Compare Repositories</button>
      <div>
        <h2>Differences:</h2>
        <ul>
          {differences.map((diff, index) => (
            <li key={index}>
              <strong>Name:</strong> {diff.name}<br />
              <strong>Location:</strong> {diff.location}<br />
              <strong>Repository:</strong> {diff.repository}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
