import React from "react";
import "../component/selectFilter.scss";

export default function SelectFilter({onSwitchFilter}) {
  return (
    <div className="container-select">
      <select onClick={onSwitchFilter} id="state">
        <option value="All">All</option>
        <option value="Done">Done</option>
        <option value="unDone">unDone</option>
      </select>
    </div>
  );
}
