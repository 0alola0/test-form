"use client";
import React, { useState} from "react";
import FormItem from "./FormItem";
import FormHeaderItem from "./FormHeaderItem";

const FormContainer = ({
  singleForm,
  handleFormAddition,
  formIndex,
  handleItemChange,
  isLast,
  isFirst,
  handleInputAddition,
  handleItemDeletion,
  handleFormDeletion,
  showEmptyFormPrompt,
  showEmptyInputPrompt,
}) => {
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [showEmpty, setShowEmpty] = useState(true);
  const handleEmpty = () => {
    handleInputAddition(formIndex)
    setShowEmpty(false);
    setTimeout(() => {
      setShowEmpty(true);
    }, 3000);
  }
 
  return (
    <div className="form_container">
      <div>
        <FormHeaderItem
          header={singleForm.header}
          formIndex={formIndex}
          handleItemChange={handleItemChange}
        />
        {singleForm?.items?.map((item, index) => (
          <FormItem
            key={index}
            item={item}
            formIndex={formIndex}
            itemIndex={index}
            handleItemChange={handleItemChange}
            handleItemDeletion={handleItemDeletion}
          />
        ))}
        <button type="button" onClick={handleEmpty} className="add_activity">
          {/* პრომფტი სიცარიელის */}
          <div
            className="empty_prompt activity"
            style={showEmptyInputPrompt&&!showEmpty ? {} : { display: "none" }}
          >
            <div>
              <p>ველი ცარიელია</p>
            </div>
            <div className="triangle"></div>
          </div>

          <img src="/plus-white.svg" alt="" />
          აქტივობის დამატება
        </button>
      </div>
      <div className="actions">
        <button
          className="minus"
          type="button"
          onClick={() => setShowDeletePrompt(true)}
          style={isFirst ? { display: "none" } : {}}
        >
          <div
            style={!showDeletePrompt ? { display: "none" } : {}}
            className="delete_prompt"
          >
            <div>
              <a onClick={() => {
                setShowDeletePrompt(false);
                handleFormDeletion(formIndex)}}>წაშლა</a>
              <a
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeletePrompt(false);
                }}
              >
                არა
              </a>
            </div>
            <div className="triangle"></div>
          </div>
          <img src="/minus-white.svg" alt="" />
        </button>
        <button
          className="plus"
          type="button"
          style={!isLast ? { display: "none" } : {}}
          onClick={()=>handleFormAddition(formIndex)}
        >
          <div
            className="empty_prompt"
            style={!showEmptyFormPrompt ? { display: "none" } : {}}
          >
            <div>
              <p>ველი ცარიელია</p>
            </div>
            <div className="triangle"></div>
          </div>
          <img src="/plus-white.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

export default FormContainer;
