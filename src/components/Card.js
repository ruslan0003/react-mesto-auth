import React from 'react';
import deleteIcon from '../images/delete-icon.svg';
import { UserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
	}

	function handleLikeClick() {
		props.onCardLike(props.card);
	}
	
	function handleDeleteClick() {
		props.onCardDelete(props.card);
	}

	const currentUser = React.useContext(UserContext);
	const isOwn = props.card.owner._id === currentUser._id;
	const cardDeleteButtonClassName = (
  `element__delete-button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`
	);

	// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
	const isLiked = props.card.likes.some(i => i._id === currentUser._id);

	const cardLikeIconClassName = (
		`${isLiked? 'element__like-icon element__like-icon_active' : 'element__like-icon'}`
	);

  return (
    <div className="element-template" key={props.card._id}>
      <li className="element">
        <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}>
          <img className="element__delete-icon" src={deleteIcon} alt="Иконка кнопки удалить" />
        </button>
				<>
        <img className="element__photo" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
				</>
        <div className="element__title-background">
          <h3 className="element__title">{props.card.name}</h3>
          <div className="element__like-wrapper">
            <button className="element__like-button" onClick={handleLikeClick}>
              <div className={cardLikeIconClassName}></div>
            </button>
            <p className="element__like-number">{props.card.likes.length}</p>
          </div>
        </div>
      </li>
    </div>
  );
}

export default Card;
