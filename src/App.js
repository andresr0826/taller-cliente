import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Mecanico from './pages/Mecanico';
import Encargado from './pages/Encargado';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route
          path="/mecanico"
          element={
            <ProtectedRoute>
              <Mecanico />
            </ProtectedRoute>
          }
        />
        <Route
          path="/encargado"
          element={
            <ProtectedRoute>
              <Encargado />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;

