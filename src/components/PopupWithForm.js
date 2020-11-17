import React from 'react';
import closeIcon from '../images/close-icon.svg';

function PopupWithForm(props) {

  return (
    <section className={props.isOpen ? `popup ${props.name} popup_opened` : `popup ${props.name}`}>
      <div className={`${props.name}__container`}>
        <button className={`${props.name}__close-button close-button`} onClick={props.onClose}>
          <img className={`${props.name}__close-icon close-icon`} src={closeIcon} alt="Иконка закрытия модального окна" />
        </button>
        <h3 className={`${props.name}__title`}>{props.title}</h3>
        <form className={`${props.name}__form form`} name={props.name} noValidate onSubmit={props.onSubmit}>
          {props.children}
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
