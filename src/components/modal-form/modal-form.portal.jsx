import React from "react";
import FormComponent from "../todo-form/form.component";
import "./modal-form.styles.less";
import { ReactDOM } from "react";

const ModalPortal = ({ state, closeModal }) => {
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

export default ModalPortal;
