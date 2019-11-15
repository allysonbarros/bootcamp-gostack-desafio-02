import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '~/pages/SignIn';
import ForgotPassword from '~/pages/ForgotPassword';
import Students from '~/pages/Students';
import Plans from '~/pages/Plans';
import Registrations from '~/pages/Registrations';
import HelpOrders from '~/pages/HelpOrders';
import ResetPassword from '~/pages/ResetPassword';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/forgot-password" exact component={ForgotPassword} />
      <Route path="/reset-password/:token" exact component={ResetPassword} />

      <Route path="/students" component={Students} isPrivate />
      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/registrations" component={Registrations} isPrivate />
      <Route path="/help-orders" component={HelpOrders} isPrivate />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
