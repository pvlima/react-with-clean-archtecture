import React from 'react';
import { Login } from '@/presentation/pages';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '@/presentation/styles/global.scss';

export function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}
