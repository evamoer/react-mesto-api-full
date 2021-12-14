import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import useFormAndValidation from "../hooks/validationHook";
import { inputValues } from "../hooks/validationHook";
import PopupWithForm from "./PopupWithForm";

/**
 * Интерфейс для EditAvatarPopup.
 * @prop onClose - функция закрытия попапа.
 * @prop onUpdateAvatar - обработчик данных формы при сабмите.
 * @prop onMouseDown - обработчик закрытия попапа по клику на оверлэй.
 */
interface EditAvatarPopupProps {
  onMouseDown: (evt: React.MouseEvent) => void;
  onClose: () => void;
  onUpdateAvatar: (values: inputValues) => void;
}

/**
 * EditAvatarPopup - компонент попапа с формой изменения аватара пользователя.
 * Включает в себя компонент PopupWithForm.
 */
const EditAvatarPopup: React.FunctionComponent<EditAvatarPopupProps> = ({
  onMouseDown,
  onClose,
  onUpdateAvatar,
}) => {
  /**
   * Параметр состояния попапа: true - открыт, false - закрыт.
   */
  const { editAvatarPopupState } = useSelector(
    (state: RootState) => state.popup
  );

  /**
   * Параметры для валидации формы.
   */
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  /**
   * Параметр загрузки данных на сервер.
   */
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  /**
   * Хук установки начального состояния формы при открытии попапа.
   */
  useEffect(() => {
    if (editAvatarPopupState) {
      resetForm();
      setValues({ avatar: "" });
    }
  }, [editAvatarPopupState]);

  /**
   * Обработчик сабмита формы.
   */
  const handleFormSubmit = (evt: React.ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onUpdateAvatar(values);
  };

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="editAvatarForm"
      submitButtonText={!isLoading ? "Сохранить" : "Сохранение..."}
      isOpen={editAvatarPopupState}
      onMouseDown={onMouseDown}
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
};

export default EditAvatarPopup;
