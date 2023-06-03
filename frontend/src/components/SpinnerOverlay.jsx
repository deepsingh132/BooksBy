import React from "react";
import "./Styles/app.css";

const SpinnerOverlay = ({ apiCall, msg }) => {

  apiCall = apiCall || false; // Set apiCall to false if it's falsy

  return (
    <div className="loading-overlay">
      {apiCall && (
        <div className="spinnerWithText">
          <div className="spinner"></div>
          <div className="loading-text">{msg || "Loading..."}</div>
        </div>
      )}
      {!apiCall && <div className="spinner"></div>}
    </div>
  );
};

export default SpinnerOverlay;
