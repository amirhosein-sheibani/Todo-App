import { Delete, Done, Remove } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Task from "./Task";
import Input from "./Input";
import "../component/todoList.scss";
import SelectFilter from "./SelectFilter";

export default function TodoList() {
  const [addTask, setAddTask] = useState(false);
  const [task, setTask] = useState("");
  const [editing, setEditing] = useState(false);
  const [obj, setObj] = useState({});

  //get data from localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTodos = localStorage.getItem("tasks");

    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  //set data in LocalStorage
  useEffect(() => {
    if (editing === false) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editing === false) {
      setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          text: task,
          time: new Date().toLocaleString(),
          completed: "false",
        },
      ]);
    } else {
      const filterCheckItem = tasks.findIndex((todo) => {
        return todo.id === obj.id;
      });
      const main_array = tasks;
      main_array[filterCheckItem] = {
        id: obj.id,
        text: task,
        time: obj.time,
        completed: "false",
      };
      setTasks(main_array);
      console.log(main_array);
    }

    setAddTask(false);
    setTask("");
    setEditing(false);
  };

  //for delete the task
  const handleClickDelete = (id) => {
    const removeItem = tasks.filter((todo) => {
      return todo.id !== id;
    });

    setTasks(removeItem);
  };

  //for check task which isCompleted or not
  const handleCheckItem = (id) => {
    const filterCheckItem = tasks.findIndex((todo) => {
      return todo.id === id;
    });

    const newTasks = [...tasks];

    const targetTask = newTasks[filterCheckItem];

    targetTask.completed == "false"
      ? (targetTask.completed = "true")
      : (targetTask.completed = "false");

    setTasks(newTasks);
  };

  //to change the title
  const handleEditeItem = (id, time) => {
    setEditing(true);
    setAddTask(true);

    const filteredItem = tasks.findIndex((todo) => {
      return todo.id === id;
    });

    const newTasks = [...tasks];

    const targetTasks = newTasks[filteredItem];

    setTask(targetTasks.text);

    setObj(targetTasks, {
      id: id,
      text: task,
      time: time,
      completed: "false",
    });

    console.log(obj);
  };

  //for Filterin
  const handleSwitchFilter = (e) => {
    setEditing("true");

    const select = e.target.value;

    const newTasks = [...tasks];

    const filterCompletedTrue = newTasks.filter((todo) => {
      return todo.completed === "true";
    });

    const filterCompletedFalse = newTasks.filter(
      (todo) => todo.completed === "false"
    );

    switch (select) {
      case "All":
        setTasks(newTasks);
        window.location.reload(false);
        break;
      case "Done":
        setTasks(filterCompletedTrue);
        break;
      case "unDone":
        setTasks(filterCompletedFalse);
        break;
    }
  };

  return (
    <div className="container">
      <h1>ToDo List</h1>
      <div className="second-section">
        <button onClick={() => setAddTask(!addTask)}>Add Task</button>
        <div className="badge"></div>
        <SelectFilter onSwitchFilter={handleSwitchFilter} />
      </div>

      <form className="tasks" onSubmit={handleSubmit}>
        {addTask && (
          <div className="add-input">
            {addTask && (
              <Input task={task} onChange={(e) => setTask(e.target.value)} />
            )}
          </div>
        )}

        {Array.isArray(tasks)
          ? tasks.map((todo) => (
              <Task
                onCheckItem={handleCheckItem}
                onClickDelete={handleClickDelete}
                onClickEdite={handleEditeItem}
                todo={todo}
              />
            ))
          : null}
      </form>
    </div>
  );
}
