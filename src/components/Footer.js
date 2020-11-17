import React from 'react';
import { Switch, Route } from 'react-router';
import { ROUTES_MAP } from '../utils/routesMap.js';

function Footer() {
  return <Switch>
    <Route path={ROUTES_MAP.NOT_FOUND} exact/>
    <Route path="*">
    <footer className="footer">
      <p className="footer__copyright">&copy; Руслан&nbsp;Лукичев</p>
    </footer>
    </Route>
  </Switch>

}

export default Footer;