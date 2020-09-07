import React from "react";
import "./Task.css";

const Task = ({ item, deleteTodo }) => {
  return (
    <div className="task">
      <p>{item.todo}</p>
      <button className="delete" onClick={() => deleteTodo(item._id)}>
        Delete
      </button>
    </div>
  );
};

export default Task;
