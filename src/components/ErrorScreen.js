import React from "react";

function ErrorScreen({ errorMessage, handleErrorReload }) {
  return (
    <div className="error-screen">
      <div className="error-container">
        <h2>
          <i className="error-icon">⚠️</i> Something went wrong
        </h2>
        <p>{errorMessage}</p>
        <button onClick={handleErrorReload} className="error-button">
          Reload API
        </button>
      </div>
    </div>
  );
}
export default ErrorScreen;
