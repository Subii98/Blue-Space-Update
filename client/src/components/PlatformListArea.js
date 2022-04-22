import React from "react";
import { Link } from "react-router-dom";

function PlatformListArea() {
  return (
    <div className="postarea">
      <div className="platformListArea">
        <div className="sectionTitle">
          <span> Quiz for Platforms</span>
          <button type="button">
            <Link to="/quizCreate">Create new quiz</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlatformListArea;
