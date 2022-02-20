import React from 'react';
import { Login } from '@/presentation/pages';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}
