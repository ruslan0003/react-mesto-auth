import React from 'react';
import closeIcon from '../images/close-icon.svg';

function PopupWithImage(props) {
  if (props.card) {
    return (
      <section className="popup popup-image popup_opened">
        <figure className="popup-image__container">
          <img className="popup-image__photo" src={props.card.link} alt={props.card.name} />
          <button className="popup-image__close-button" onClick={props.onClose}>
            <img className="popup-image__close-icon close-icon" src={closeIcon} alt="Иконка закрытия модального окна" />
          </button>
          <figcaption className="popup-image__title">{props.card.name}</figcaption>
        </figure>
      </section>
    );
  }
  else return null;
}

export default PopupWithImage;
