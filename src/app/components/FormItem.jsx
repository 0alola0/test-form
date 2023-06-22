"use client";
import React, { useState } from "react";

const FormItem = ({
  item,
  formIndex,
  itemIndex,
  handleItemChange,
  isLast,
  isFirstInput,
  handleInputAddition,
  handleItemDeletion,
  showEmptyInputPrompt,
  showEmptyPrompt,
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
        className={showEmptyPrompt||showEmptyInputPrompt||item.required?"red":""}
      />
      <div className="item_actions">
        <button
          type="button"
          onClick={() => setShowDeletePrompt(true)}
          // style={isFirstInput ? { display: "none" } : {}}
        >
                    <div
            style={!showDeletePrompt ? { display: "none" } : {}}
            className="delete_prompt"
          >
            <div>
              <a onClick={() => handleItemDeletion(formIndex, itemIndex)}>წაშლა</a>
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
        {/* <button
          style={!isLast||isFirstInput ? { display: "none" } : {}}
          type="button"
          disabled={!isLast&&!isFirstInput}
          onClick={() => handleInputAddition(formIndex)}
        >
          <img src="/plus-green.svg" alt="" />
        </button> */}
      </div>
    </div>
  );
};

export default FormItem;
