import React, { useState } from "react";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";
import edit_icon from "../assets/edit.png";
import save_icon from "../assets/save.png"; 

const TodoItems = ({ text, id, isComplete, isEditing, deleteTodo, toggle, editTodo, toggleEdit }) => {
  const [newText, setNewText] = useState(text); // State to hold edited text

  const handleEditSubmit = () => {
    if (newText.trim() === "") return;
    editTodo(id, newText); // Call the editTodo function with the new text
  };

  return (
    <div className="flex items-center my-3 gap-3">
      <div
        onClick={() => {
          toggle(id);
        }}
        className="flex flex-1 items-center cursor-pointer"
      >
        <img className="w-7" src={isComplete ? tick : not_tick} alt="" />
        
        {/* Conditionally render text or input field based on editing mode */}
        {isEditing ? (
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="bg-gray-100 text-slate-700 ml-4 text-[17px] p-1 rounded"
          />
        ) : (
          <p
            className={`text-slate-700 ml-4 text-[17px] ${
              isComplete ? "line-through" : ""
            }`}
          >
            {text}
          </p>
        )}
      </div>

      {/* Edit or Save */}
      {isEditing ? (
        <img
          onClick={handleEditSubmit}
          className="w-4 cursor-pointer"
          src={save_icon}
          alt="Save"
        />
      ) : (
        <img
          onClick={() => toggleEdit(id)}
          className="w-4 cursor-pointer"
          src={edit_icon}
          alt="Edit"
        />
      )}

      {/* Delete */}
      <img
        onClick={() => {
          deleteTodo(id);
        }}
        className="w-3.5 cursor-pointer"
        src={delete_icon}
        alt="Delete"
      />
    </div>
  );
};

export default TodoItems;
