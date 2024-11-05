import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import MainContent from "./MainContent";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("access_token"));
  const [isRegister, setIsRegister] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {isAuthenticated ? (
            <MainContent onLogout={handleLogout} />
          ) : isRegister ? (
            <Register
              onLogin={handleLoginSuccess}
              toggleLogin={() => setIsRegister(false)}
            />
          ) : (
            <Login
              onLogin={handleLoginSuccess}
              toggleRegister={() => setIsRegister(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

