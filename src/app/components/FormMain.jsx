"use client";
import React, { useState } from "react";
import FormContainer from "./FormContainer";

const FormMain = () => {
  const [forms, setForms] = useState([
    {
      header: {
        task: "",
        placeholder: "შესრულების ინდიკატორის სათაური",
        required: false,
      },
      items: [],
    },
  ]);
  const [showEmptyPrompt, setShowEmptyPrompt] = useState(false);
  const [showEmptyInputPrompt, setShowEmptyInputPrompt] = useState(false);

  const handleFormAddition = (formIndex) => {
    const isAnyFormEmpty = (formIndex) => {
      const isHeaderEmpty = forms[formIndex].header.task === "";
      const areItemsEmpty = forms[formIndex].items?.some(
        (item) => item.task === ""
      );
      return isHeaderEmpty || areItemsEmpty;
    };

    if (!isAnyFormEmpty(formIndex)) {
      const newForm = {
        header: {
          task: "",
          placeholder: "შესრულების ინდიკატორის სათაური (არასავალდებულო)",
          required: false,
        },
        items: [],
      };
      setForms([...forms, newForm]);
    } else {
      setShowEmptyPrompt(true);
      const updatedForms = [...forms];
      if (updatedForms[formIndex].header.task === "") {
        updatedForms[formIndex].header.required = true;
      }
      updatedForms[formIndex].items.forEach((item) => {
        if (item.task === "") {
          item.required = true;
        }
      });
      setForms(updatedForms);
      setTimeout(() => {
        const resetForms = [...forms];
        resetForms[formIndex].header.required = false;
        resetForms[formIndex].items.forEach((item) => {
          item.required = false;
        });
        setForms(resetForms);
        setShowEmptyPrompt(false);
      }, 3000);
    }
  };

  const handleFormDeletion = (formIndex) => {
    const updatedForms = [...forms];
    updatedForms.splice(formIndex, 1);
    setForms(updatedForms);
    console.log(showEmptyPrompt);
  };

  const handleInputAddition = (formIndex) => {
    const updatedForms = [...forms];
    const currentForm = updatedForms[formIndex];
    const isHeaderEmpty = currentForm.header.task === "";
    const allPreviousItemsNotEmpty =
      currentForm.items.length === 0 ||
      currentForm.items.every((item) => item.task !== "");
    if (!isHeaderEmpty && allPreviousItemsNotEmpty) {
      currentForm.items.push({
        task: "",
        placeholder: "შესრულების ინდიკატორის სათაური (არასავალდებულო)",
        required: false,
      });
      setForms(updatedForms);
    } else {
      setShowEmptyInputPrompt(true);
      const updatedForms = [...forms];
      updatedForms[formIndex].items.forEach((item) => {
        if (item.task === "") {
          item.required = true;
        }
      });
      setForms(updatedForms);
      setTimeout(() => {
        const resetForms = [...forms];
        resetForms[formIndex].items.forEach((item) => {
          item.required = false;
        });
        setForms(resetForms);
        setShowEmptyInputPrompt(false);
      }, 3000);
    }
  };

  const handleItemDeletion = (formIndex, itemIndex) => {
    const updatedForms = [...forms];
    updatedForms[formIndex].items.splice(itemIndex, 1);
    setForms(updatedForms);
  };

  const handleItemChange = (formIndex, itemIndex, value, isHeader) => {
    const updatedForms = [...forms];
    if (isHeader) {
      updatedForms[formIndex].header.task = value;
    } else {
      updatedForms[formIndex].items[itemIndex].task = value;
    }
    setForms(updatedForms);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedForms = forms.map((form) => {
      if (form.header.task === "") {
        form.header.required = true;
      } else {
        form.header.required = false;
      }

      form.items.forEach((item) => {
        if (item.task === "") {
          item.required = true;
        } else {
          item.required = false;
        }
      });
      return form;
    });

    setForms(updatedForms);
  };

  console.log(forms);

  return (
    <form onSubmit={handleSubmit}>
      {forms.map((form, index) => (
        <FormContainer
          key={index}
          singleForm={form}
          formIndex={index}
          handleFormAddition={handleFormAddition}
          handleItemChange={handleItemChange}
          handleInputAddition={handleInputAddition}
          handleItemDeletion={handleItemDeletion}
          handleFormDeletion={handleFormDeletion}
          showEmptyPrompt={showEmptyPrompt}
          showEmptyInputPrompt={showEmptyInputPrompt}
          isLast={index + 1 == forms.length ? true : false}
          isFirst={forms.length === 1}
        />
      ))}

      <button className="submit" type="submit">
        დამატება
      </button>
    </form>
  );
};

export default FormMain;

//არც ერთი ცარიელი აქტივობა არ უნდა იყოს. არც ერთ პლიუსს არ ეჭირება
//თუ რომელიმე აქტივობა მაინც არის ცარიელი. თუ აქტივობა არ არის საერთოდ დამატებული
// მაშინ შეიძლება ორივე პლიუსზე დაჭერა
