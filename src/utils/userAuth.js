import { setToken } from './token.js';

export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => {
      if (res.status === 201) {
        console.log('Регистрация прошла успешно');
        return res.json();
      }
      else if (res.status === 400) {
        console.log('Некорректно заполнено одно из полей либо такой пользователь уже зарегистрирован!');
        return;
      }
    })
    .then((res) => {
      return res;
    });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => {
      if (res.status === 200) {
        console.log('Авторизация прошла успешно');
        return res.json();
      }
      else if (res.status === 401) {
        console.log('Неверно указан email либо пароль');
        return;
      }
      else if (res.status === 400) {
        console.log('Не заполнено одно из полей');
        return;
      }
    })
    .then((data) => {
      if (data) {
        setToken(data.jwt);
        return data;
      }
    });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((res) => {
    if (res.status === 200) {
      console.log('Токен передан корректно');
      return res.json();
    }
    else if (res.status === 401) {
      console.log('Токен не передан или передан не в том формате');
      return;
    }
    else if (res.status === 400) {
      console.log('Переданный токен некорректен');
      return;
    }
  })
  .then(data => data)
};