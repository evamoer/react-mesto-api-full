import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function DeletePlacePopup({
  isOpen,
  onClose,
  onApproveDeletePlace,
}) {
  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    onApproveDeletePlace();
  };

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete-card"
      submitButtonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      isValid={true}
    />
  );
}
