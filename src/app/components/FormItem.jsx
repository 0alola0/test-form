"use client";
import React, { useState } from "react";

const FormItem = ({
  item,
  formIndex,
  itemIndex,
  handleItemChange,
  handleItemDeletion,
}) => {
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);

  const handleChange = (event) => {
    const { value } = event.target;
    handleItemChange(formIndex, itemIndex, value, false);
  };
  return (
    <div className="form_item">
      <input
        type="text"
        value={item.task}
        placeholder={item.placeholder}
        onChange={handleChange}
        className={item.required ? "red" : ""}
      />
      <div className="item_actions">
        <button type="button" onClick={() => setShowDeletePrompt(true)}>
          <div
            style={!showDeletePrompt ? { display: "none" } : {}}
            className="delete_prompt"
          >
            <div>
              <a onClick={() => handleItemDeletion(formIndex, itemIndex)}>
                წაშლა
              </a>
              <a
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeletePrompt(false);
                }}
              >
                არა
              </a>
            </div>
          </div>
          <img src="/minus-red.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

export default FormItem;
