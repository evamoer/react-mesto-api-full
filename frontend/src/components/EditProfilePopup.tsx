import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import useFormAndValidation from "../hooks/validationHook";
import { inputValues } from "../hooks/validationHook";
import PopupWithForm from "./PopupWithForm";

/**
 * Интерфейс для EditProfilePopup.
 * @prop onClose - функция закрытия попапа.
 * @prop onUpdateUser - обработчик данных формы при сабмите.
 * @prop onMouseDown - обработчик закрытия попапа по клику на оверлэй.
 */
interface EditProfilePopupProps {
  onMouseDown: (evt: React.MouseEvent) => void;
  onClose: () => void;
  onUpdateUser: (values: inputValues) => void;
}

/**
 * EditProfilePopup - компонент попапа с формой добавления карточки в галерею.
 * Включает в себя компонент PopupWithForm.
 */
const EditProfilePopup: React.FunctionComponent<EditProfilePopupProps> = ({
  onMouseDown,
  onClose,
  onUpdateUser,
}) => {
  /**
   * Параметр состояния попапа: true - открыт, false - закрыт.
   */
  const { editProfilePopupState } = useSelector(
    (state: RootState) => state.popup
  );

  /**
   * Параметры для валидации формы.
   */
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  /**
   * Параметры текущего пользователя.
   */
  const { name, about } = useSelector((state: RootState) => state.user);

  /**
   * Параметр загрузки данных на сервер.
   */
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  /**
   * Хук установки начального состояния формы при открытии попапа.
   */
  useEffect(() => {
    if (editProfilePopupState) {
      setValues({ name, about });
    }
  }, [editProfilePopupState]);

  /**
   * Обработчик сабмита формы.
   */
  const handleFormSubmit = (evt: React.ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onUpdateUser(values);
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="editProfileForm"
      submitButtonText={!isLoading ? "Сохранить" : "Сохранение..."}
      isOpen={editProfilePopupState}
      onMouseDown={onMouseDown}
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
          minLength={2}
          maxLength={40}
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
            errors?.about && "popup__input_type_error"
          }`}
          name="about"
          placeholder="О себе"
          value={values?.about || ""}
          onChange={handleChange}
          required
          minLength={2}
          maxLength={200}
        />
        {errors?.about && (
          <span className="popup__error" id="aboutInputError">
            {errors.about}
          </span>
        )}
      </div>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
