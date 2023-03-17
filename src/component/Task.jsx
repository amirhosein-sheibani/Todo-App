import "../component/task.scss";

import React from "react";

export default function ({ onCheckItem, onClickDelete, onClickEdite, todo }) {
  return (
    <div className="task-container">
      <li
        key={todo.id}
        className={todo.completed === "true" ? "task completed" : "task"}
      >
        <div className="left">
          <input
            type="checkbox"
            onClick={() => onCheckItem(todo.id)}
            checked={todo.completed == "true"}
          ></input>
          <h3>{todo.text}</h3>
          <span>{todo.time}</span>
        </div>
        <div className="right">
          <span
            className="material-icons"
            onClick={() => onClickDelete(todo.id)}
            id="delete"
          >
            delete
          </span>
          <span
            className="material-icons"
            onClick={() => onClickEdite(todo.id, todo.time)}
            id="edite"
          >
            edite
          </span>
        </div>
      </li>
    </div>
  );
}
