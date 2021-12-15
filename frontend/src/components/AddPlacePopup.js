import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormAndValidation from "../hooks/validationHook";

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  submitButtonText,
}) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    if (isOpen) {
      resetForm();
      setValues({ name: "", link: "" });
    }
  }, [isOpen]);

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace(values);
  };

  return (
    <PopupWithForm
      title="Новое место"
      name="addCardForm"
      submitButtonText={submitButtonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      isValid={isValid}
    >
      <div className="popup__input-field">
        <input
          type="text"
          className={`popup__input ${
            errors?.name && "popup__input_type_error"
          }`}
          name="name"
          placeholder="Название"
          value={values?.name || ""}
          onChange={handleChange}
          required
          minLength="2"
          maxLength="30"
        />
        {errors?.name && (
          <span className="popup__error" id="cardTitleInputError">
            {errors?.name}
          </span>
        )}
      </div>
      <div className="popup__input-field">
        <input
          type="url"
          className={`popup__input ${
            errors?.link && "popup__input_type_error"
          }`}
          name="link"
          placeholder="Ссылка на картинку"
          value={values?.link || ""}
          onChange={handleChange}
          required
        />
        {errors?.link && (
          <span className="popup__error" id="cardLinkInputError">
            {errors.link}
          </span>
        )}
      </div>
    </PopupWithForm>
  );
}
