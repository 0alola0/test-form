"use client";
import React, { useState } from "react";
import FormContainer from "./FormContainer";

const FormMain = () => {
  //ობიექტში სახელები დროებითია, required-ს ვიყენებ ვალიდაციისას ცარიელი ინფოდების გასაწითლებლად/დასაჭერად. მომავალში უკეთესი ფროფერთიების დამატება შეიძლება:დ
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

  const [showEmptyFormPrompt, setShowEmptyFormPrompt] = useState(false);
  const [showEmptyInputPrompt, setShowEmptyInputPrompt] = useState(false);

  //არც ერთი ცარიელი აქტივობა არ უნდა იყოს.
  //არც ერთ პლიუსს არ ეჭირება თუ რომელიმე აქტივობა მაინც არის ცარიელი.
  //თუ აქტივობა არ არის საერთოდ დამატებული მაშინ შეიძლება ორივე პლიუსზე დაჭერა
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
      throwRequiredEmpty(setShowEmptyFormPrompt, formIndex);
    }
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
      throwRequiredEmpty(setShowEmptyInputPrompt, formIndex);
    }
  };

  //აჩენს პრომფტს და აწითლებს დასამატებლად საჭირო ინფუთს/ჰედერს. 3 წამის მერე ქრება
  const throwRequiredEmpty = (state, formIndex) => {
    state(true);
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
      state(false);
    }, 3000);
  };

  //წაშლის ფუნქციები
  const handleFormDeletion = (formIndex) => {
    const updatedForms = [...forms];
    updatedForms.splice(formIndex, 1);
    setForms(updatedForms);
  };

  const handleItemDeletion = (formIndex, itemIndex) => {
    const updatedForms = [...forms];
    updatedForms[formIndex].items.splice(itemIndex, 1);
    setForms(updatedForms);
  };

  //შეცვლის ფუნქცია (ჰედერიც და აითემიც)
  const handleItemChange = (formIndex, itemIndex, value, isHeader) => {
    const updatedForms = [...forms];
    if (isHeader) {
      updatedForms[formIndex].header.task = value;
    } else {
      updatedForms[formIndex].items[itemIndex].task = value;
    }
    setForms(updatedForms);
  };

  //დროებითი საბმითი, უბრალოდ ცარიელებს იჭერს და აწითლებს
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
          showEmptyFormPrompt={showEmptyFormPrompt}
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
