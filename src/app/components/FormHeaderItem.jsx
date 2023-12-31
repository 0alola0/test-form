"use client";
import React from "react";

const FormHeaderItem = ({ header, formIndex, handleItemChange }) => {
  const handleChange = (event) => {
    const { value } = event.target;
    handleItemChange(formIndex, 0, value, true);
  };
  return (
    <div className="form_item">
      <input
        type="text"
        value={header.task}
        placeholder={header.placeholder}
        onChange={handleChange}
        className={header.required ? "red" : ""}
      />
    </div>
  );
};

export default FormHeaderItem;
