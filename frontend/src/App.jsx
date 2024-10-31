import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AnchorManager from './components/AnchorManager';
import UploadManager from './components/UploadManager';
import AdminPanel from './components/AdminPanel';

console.log("App.jsx loaded");

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="sidebar">
          <h2>Menu</h2>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/admin">Admin Panel</Link></li>
            <li><Link to="/anchors">Anchor Manager</Link></li>
            <li><Link to="/upload">DBT Upload</Link></li>
          </ul>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<h1>Welcome to the Dashboard</h1>} />
            <Route path="/anchors" element={<AnchorManager />} />
            <Route path="/upload" element={<UploadManager />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
