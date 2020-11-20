import React from 'react';
import logo from '../images/logo.svg';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { ROUTES_MAP } from '../utils/routesMap.js';

function Header(props) {
  
  const { email } = props.userData;

  return <Switch>
    <Route path={ROUTES_MAP.NOT_FOUND} exact />
    <Route path="*">
      <header className="header">
        <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
        <Switch>
          <Route path={ROUTES_MAP.MAIN} exact><p className="header__email">{email}<Link to={ROUTES_MAP.LOGIN} className="header__link" onClick={props.onSignOut}>Выход</Link></p></Route>
          <Route path={ROUTES_MAP.LOGIN}><Link to={ROUTES_MAP.REGISTER} className="header__link">Регистрация</Link></Route>
          <Route path={ROUTES_MAP.REGISTER}><Link to={ROUTES_MAP.LOGIN} className="header__link">Вход</Link></Route>
        </Switch>
      </header>
    </Route>

  </Switch>


}

export default Header;

