import React from 'react';
import success from '../images/success.svg';
import failure from '../images/failure.svg';
import closeIcon from '../images/close-icon.svg';


function InfoTooltip(props) {

  return (
    <section className={props.isOpen ? `popup popup-info popup_opened` : `popup popup-info`}>
      <div className="popup-info__container">
        <button className="popup-info__close-button" onClick={props.onClose}></button>
        <img className="popup-info__image" src={props.isRegistrationValid ? `${success}` : `${failure}`} alt="Иконка" />
        <h2 className="popup-info__title">{props.isRegistrationValid ? `${props.onSuccess}` : `${props.onFailure}` }</h2>
        <button className="popup-info__close-button" onClick={props.onClose}>
            <img className="popup-info__close-icon close-icon" src={closeIcon} alt="Иконка закрытия модального окна" />
          </button>
      </div>
    </section>
  )
}

export default InfoTooltip;