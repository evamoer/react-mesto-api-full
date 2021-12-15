import React, { useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useFormAndValidation from "../hooks/validationHook";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  submitButtonText,
}) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();
  const { name, about } = useContext(CurrentUserContext);

  useEffect(() => {
    if (isOpen) {
      resetForm();
      setValues({ name, description: about });
    }
  }, [isOpen]);

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.description,
    });
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="editProfileForm"
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
          placeholder="Имя пользователя"
          value={values?.name || ""}
          onChange={handleChange}
          required
          minLength="2"
          maxLength="40"
        />
        {errors?.name && (
          <span className="popup__error" id="nameInputError">
            {errors.name}
          </span>
        )}
      </div>
      <div className="popup__input-field">
        <input
          type="text"
          className={`popup__input ${
            errors?.description && "popup__input_type_error"
          }`}
          name="description"
          placeholder="О себе"
          value={values?.description || ""}
          onChange={handleChange}
          required
          minLength="2"
          maxLength="200"
        />
        {errors?.description && (
          <span className="popup__error" id="aboutInputError">
            {errors.description}
          </span>
        )}
      </div>
    </PopupWithForm>
  );
}
