import React from "react";
import "./loader.css";

const AppLoader = () => {
  return (
    <div className="loading-screen" dir="ltr">
      <div className="loading-container">
        <div className="loading-text">
          <span className="animated-letter large">A</span>
          <span className="animated-letter">S</span>
          <span className="animated-letter">S</span>
          <span className="animated-letter">O</span>
          <span className="animated-letter"> </span>
          <span className="animated-letter large">C</span>
          <span className="animated-letter">O</span>
          <span className="animated-letter">O</span>
          <span className="animated-letter">M</span>
        </div>
      </div>
    </div>
  );
};

export default AppLoader;
