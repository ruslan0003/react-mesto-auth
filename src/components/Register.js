import React from 'react';
import { Link } from 'react-router-dom';
import * as userAuth from '../utils/userAuth.js';
import { ROUTES_MAP } from '../utils/routesMap.js';

function Register(props) {
  const [data, setData] = React.useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = React.useState('');

  function handleChange(e) {
    const {name, value} = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    })
  )};

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password} = data;
    userAuth.register(email, password).then((res) => {
      if (res) {
        props.onRegister(true, ROUTES_MAP.LOGIN);
      }
      else {
        props.onRegister(false, ROUTES_MAP.REGISTER);
        setMessage('Некорректно заполнено одно из полей либо такой пользователь уже зарегистрирован!');
      }
    }).catch(err => console.log(err));
  };

  return(
    <div className="register">
      <h3 className="register__title">Регистрация</h3>
      <p className="form-auth__error">{message}</p>
      <form onSubmit={handleSubmit} className="form-auth">
        <input id="email" name="email" type="email" value={data.email} className="form-auth__input" onChange={handleChange} placeholder="Email" required minLength="2" maxLength="40"/>
        <input id="password" name="password" type="password" value={data.password} className="form-auth__input" onChange={handleChange} placeholder="Пароль" required minLength="3" maxLength="40"/>
        <button className="form-auth__submit" type="submit">Зарегистрироваться</button>
      </form>
      <p className="register__ask-login">Уже зарегистрированы? <Link to={ROUTES_MAP.LOGIN} className="register__login-link">Войти</Link></p>
    </div>
  );
};

export default Register;
