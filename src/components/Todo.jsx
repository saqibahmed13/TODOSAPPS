import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";

const Todo = () => {
  const inputRef = useRef();
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  const add = () => {
    const inputText = inputRef.current.value.trim(); //if someone gives the spacing it will be removed using trim

    if (inputText === "") {
      return null;
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
      isEditing: false, // Initialize editing state
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = ""; // after adding search should be empty
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  const toggle = (id) => {
    setTodoList((prevTodo) => {
      return prevTodo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete }; // toggle completion state
        }
        return todo;
      });
    });
  };

  // Edit functionality
  const editTodo = (id, newText) => {
    setTodoList((prevTodo) => {
      return prevTodo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text: newText, isEditing: false }; // update text and exit edit mode
        }
        return todo;
      });
    });
  };

  const toggleEdit = (id) => {
    setTodoList((prevTodo) => {
      return prevTodo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isEditing: !todo.isEditing }; // toggle edit mode
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList)); // store updated todos
  }, [todoList]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white place-self-center w-11/22 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      
        {/* title */}
        <div className="flex items-center mt-7 gap-2">
          <img className="w-8" src={todo_icon} alt="" />
          <h1 className="text-3xl font-semibold">To-Do App</h1>
        </div>

        {/* input */}
        <div className="flex items-center my-7 bg-gray-200 rounded-full">
          <input
            ref={inputRef}
            className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
            type="text"
            placeholder="Add your task"
          />
          <button
            onClick={add}
            className="border-none rounded-full bg-green-500 w-32 h-14 text-white text-lg font-medium cursor-pointer"
          >
            ADD +
          </button>
        </div>

        {/* todoList */}
        <div>
          {todoList.map((item, index) => {
            return (
              <TodoItems
                key={index}
                text={item.text}
                id={item.id}
                isComplete={item.isComplete}
                isEditing={item.isEditing}
                deleteTodo={deleteTodo}
                toggle={toggle}
                toggleEdit={toggleEdit}
                editTodo={editTodo}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Todo;
