import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/error-and-not-found.css";

function NotFound404() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <button className="not-found-button" onClick={handleGoBack}>
        Go to Homepage
      </button>
    </div>
  );
}
export default NotFound404;
