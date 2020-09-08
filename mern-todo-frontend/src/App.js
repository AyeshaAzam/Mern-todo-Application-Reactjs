import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import Task from "./components/Task";
import axios from "./axios";
import Title from "./components/Title";



function App() {
  //the idea with hooks is that we are able to keep our code more functional and avoid class based components if not desired/needed.
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  //component loads only once nerver again ( like componentDidMount but hooks version of it.)
  useEffect(() => {
    getTodos();
  }, []);

  const saveTodo = async (e) => {
    e.preventDefault();

    await axios.post("/todos", {
      todo: input,
    });
    setInput("");
    await getTodos();
  };

  const deleteTodo = async (todoId) => {
    await axios
      .delete(`/deletetodos/${todoId}`)
      .then((res) => {
        console.log("Response:", res);
        if (res.data.status === "success") {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(todoId);
  };

  const getTodos = () => {
    //calling our API with our GET method
    axios.get("/gettodos").then((res) => setTodos(res.data));
  };

  return (
    <div className="app">
      <div className="app__todoListBg">
        <Title />
        <div className="app__input">
          {/* input box */}
          <div className="app__inputBox">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          {/* button */}
          <div className="app__buttonContainer ">
            <button className="save" onClick={saveTodo} disabled={!input}>
              Save
            </button>
          </div>

          {/* {todolist} */}
        </div>
        <div className="app__todoListContainer">
          <div className="app__todoList">
            {todos.map((entry) => (
              <Task key={entry._id} item={entry} deleteTodo={deleteTodo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
