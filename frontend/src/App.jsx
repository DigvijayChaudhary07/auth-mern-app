import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'
import RefreshHandler from './RefreshHandler'

// ✅ MOVE OUTSIDE
const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const PublicRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? <Navigate to="/home" /> : element;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  return (
    <div>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route
          path="/login"
          element={<PublicRoute element={<Login />} isAuthenticated={isAuthenticated} />}
        />

        <Route
          path="/signup"
          element={<PublicRoute element={<Signup />} isAuthenticated={isAuthenticated} />}
        />

        <Route
          path="/home"
          element={<PrivateRoute element={<Home />} isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </div>
  );
};

export default App;