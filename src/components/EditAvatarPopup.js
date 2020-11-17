import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup(props) {

	const avatarRef = React.useRef(); // записываем объект, возвращаемый хуком, в переменную

	function handleSubmit(evt) {
		evt.preventDefault();
		props.onUpdateAvatar(avatarRef.current.value);
	  }

	return (
		<PopupWithForm name="popup-avatar" title="Обновить аватар" onClose={props.onClose} isOpen={props.isOpen} onSubmit={handleSubmit}>
		<input className="form__input form__input_type_avatar_url" id="avatar-url" name="avatar-url" placeholder="Ссылка на аватар"
			type="url" required ref={avatarRef}/>
		<span className="form__input-error" id="avatar-url-error"></span>
		<button className="form__submit popup-avatar__submit-button" type="submit" value="Создать">Сохранить</button>
	</PopupWithForm>
	);
}

export default EditProfilePopup;
