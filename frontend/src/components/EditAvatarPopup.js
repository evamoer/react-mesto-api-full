import React from "react";
import PopupWithForm from "./PopupWithForm";
import useFormAndValidation from "../hooks/validationHook";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  submitButtonText,
}) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  React.useEffect(() => {
    if (isOpen) {
      resetForm();
      setValues({ avatar: "" });
    }
  }, [isOpen]);

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar(values);
  };

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="editAvatarForm"
      submitButtonText={submitButtonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      isValid={isValid}
    >
      <div className="popup__input-field">
        <input
          type="url"
          className={`popup__input ${
            errors?.avatar && "popup__input_type_error"
          }`}
          name="avatar"
          placeholder="Ссылка на новый аватар"
          value={values?.avatar || ""}
          onChange={handleChange}
          required
        />
        {errors?.avatar && (
          <span className="popup__error" id="avatarLinkInputError">
            {errors.avatar}
          </span>
        )}
      </div>
    </PopupWithForm>
  );
}
