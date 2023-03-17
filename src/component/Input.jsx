import "../component/input.scss";

import React from "react";

export default function Input({ task, onChange }) {
  return (
    <div className="add-input">
      <input
        onChange={onChange}
        value={task}
        type="text"
        id="add"
        autoFocus
      ></input>
      <button type="submit" className="button-add">
        Add
      </button>
    </div>
  );
}
