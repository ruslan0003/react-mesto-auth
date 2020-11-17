
import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddCardPopup(props) {

	const [title, setTitle] = React.useState('');
	const [link, setLink] = React.useState('');

	//Обработчик изменения инпута обновляет стейт
	function handleChangeTitle(evt) {
		setTitle(evt.target.value);
	}

	function handleChangeLink(evt) {
		setLink(evt.target.value);
	}

	function handleSubmit(evt) {
		// Запрещаем браузеру переходить по адресу формы
		evt.preventDefault();

		// Передаём значения управляемых компонентов во внешний обработчик
		props.onAddPlaceSubmit(title, link);
	}

	return (

		<PopupWithForm name="popup-add" title="Новое место" onClose={props.onClose} isOpen={props.isOpen} onSubmit={handleSubmit}>
			<input className="form__input form__input_type_title" type="text" id="title-input" name="title-input" placeholder="Название" minLength="1" maxLength="30" required onChange={handleChangeTitle} />
			<span className="form__input-error" id="title-input-error"></span>
			<input className="form__input form__input_type_url" id="url-input" name="url-input" placeholder="Ссылка на картинку"
				type="url" required onChange={handleChangeLink} />
			<span className="form__input-error" id="url-input-error"></span>
			<button className="form__submit popup-add__submit-button" type="submit" value="Создать">Создать</button>
		</PopupWithForm>

	)
}


export default AddCardPopup;
