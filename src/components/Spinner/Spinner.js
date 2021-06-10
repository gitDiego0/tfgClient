import React from "react";

const Spinner = ({ loading }) => {
  return (
    <div className={loading ? "loader-wrapper is-active" : "loader-wrapper"}>
      <div className="loader is-loading"></div>
    </div>
  );
};

export default Spinner;
