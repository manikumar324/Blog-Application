import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import UserProvider from './components/context/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider> {/* Provides global context */}
      <Router> {/* Enables routing */}
        <App /> {/* Main app component */}
      </Router>
    </UserProvider>
  </StrictMode>
);
