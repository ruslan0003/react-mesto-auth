import React from 'react';
import logo from '../images/logo.svg';
import { Route, Switch } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import { ROUTES_MAP } from '../utils/routesMap.js';
import { removeToken } from '../utils/token.js';

function Header({ userData = {} }) {
  
  const { email } = userData;

  const history = useHistory();

  function signOut() {
    removeToken();
    history.push(ROUTES_MAP.LOGIN);
  }

  return <Switch>
    <Route path={ROUTES_MAP.NOT_FOUND} exact />
    <Route path="*">
      <header className="header">
        <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
        <Switch>
          <Route path={ROUTES_MAP.MAIN} exact><p className="header__email">{email}<Link to={ROUTES_MAP.LOGIN} className="header__link" onClick={signOut}>Выход</Link></p></Route>
          <Route path={ROUTES_MAP.LOGIN}><Link to={ROUTES_MAP.REGISTER} className="header__link">Регистрация</Link></Route>
          <Route path={ROUTES_MAP.REGISTER}><Link to={ROUTES_MAP.LOGIN} className="header__link">Вход</Link></Route>
        </Switch>
      </header>
    </Route>

  </Switch>


}

export default Header;

