import React from 'react';
import * as userAuth from '../utils/userAuth.js';

function Login(props) {
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
    const { email, password } = data;

    if (!email || !password) {
      return;
    }

    userAuth.authorize(email, password)
      .then((res) => {
        console.log(res);
        if (!res) {
          setMessage('Одно из полей не заполнено либо указано неверное значение');
        }

        if (res.token) {
          setData({ email: '', password: '' });
          setMessage('');
          props.onLogin(data, res.token);
        }
      })
      .catch(err => console.log(err));
  }

  return(
    <div className="login">
      <h3 className="login__title">Войти</h3>
      <p className="form-auth__error">{message}</p>
      <form onSubmit={handleSubmit} className="form-auth">
        <input id="email" name="email" type="email" value={data.email} className="form-auth__input" onChange={handleChange} placeholder="Email"/>
        <input id="password" name="password" type="password" value={data.password} className="form-auth__input" onChange={handleChange} placeholder="Пароль"/>
        <button className="form-auth__submit" type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;