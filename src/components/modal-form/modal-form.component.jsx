import React from "react";
import FormComponent from "../todo-form/form.component";
import "./modal-form.styles.less";
import { ReactDOM } from "react";


/**
 * A component to show Modal window with Form to create initial Todo
 * 
 * @param state - Defines if the modal is opened or closed 
 * @param closeModal - Used to close the modal with button
 * @returns Modal form window
 */
const ModalPopup = ({ state, closeModal }) => {
  if (!state) return;
  return (
    <div className="form-modal">
      <FormComponent> </FormComponent>

      <button className="close-modal" onClick={closeModal}>
        {" "}
        X{" "}
      </button>
    </div>
  );
};

export default ModalPopup;
