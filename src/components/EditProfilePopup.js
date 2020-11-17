import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { UserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {

	const [name, setName] = React.useState('');
	const [job, setDescription] = React.useState('');
	const currentUser = React.useContext(UserContext);

	// После загрузки текущего пользователя из API
	// его данные будут использованы в управляемых компонентах.
	React.useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser]);

	//Обработчик изменения инпута обновляет стейт
	function handleChangeName(evt) {
		setName(evt.target.value);
	}

	function handleChangeDescription(evt) {
		setDescription(evt.target.value);
	}

	function handleSubmit(e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();
	
		// Передаём значения управляемых компонентов во внешний обработчик
		props.onUpdateUser(name, job);
	}

	return (
		<PopupWithForm name="popup-edit" title="Редактировать профиль" onClose={props.onClose} isOpen={props.isOpen} onSubmit={handleSubmit}>
			<input className="form__input form__input_type_name" id="name-input" type="text" value={name || ''} name="name-input" placeholder="Имя"
				minLength="2" maxLength="40" onChange={handleChangeName} required />
			<span className="form__input-error" id="name-input-error"></span>
			<input className="form__input form__input_type_job" type="text" value={job || ''} name="job-input" id="job-input" placeholder="О себе"
				minLength="2" maxLength="200" onChange={handleChangeDescription} required />
			<span className="form__input-error" id="job-input-error"></span>
			<button className="form__submit popup-edit__submit-button" type="submit" value="Сохранить">Сохранить</button>
		</PopupWithForm>
	);
}

export default EditProfilePopup;
