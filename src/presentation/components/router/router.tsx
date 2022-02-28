import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

type RouterProps = {
  makeLogin: React.ComponentType;
};

export function Router({ makeLogin }: RouterProps) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={makeLogin} />
      </Switch>
    </BrowserRouter>
  );
}
