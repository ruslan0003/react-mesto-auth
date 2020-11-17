import React from 'react';
import failure from '../images/failure.svg';
import { Link } from 'react-router-dom';
import { ROUTES_MAP } from '../utils/routesMap.js';

function Page404() {

  return (
    <div className="page-404">
    <img className="popup-info__image" src={failure} alt="Иконка" />
    <h2 className="page-404__title">Ошибка 404. Такой страницы не существует:(</h2>
    <Link to={ ROUTES_MAP.MAIN } className="page-404__link">Вернуться на главную</Link>
    </div>
  )
}

export default Page404;