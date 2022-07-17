/* @refresh reload */
import { render } from 'solid-js/web';

import 'bootswatch/dist/superhero/bootstrap.css';
import './index.scss';

import { hashIntegration, Router } from 'solid-app-router';
import App from './App';
import { AuthenticationProvider } from './providers/Auth';
import { EditProvider } from './providers/Edit';

render(
  () => (
    <AuthenticationProvider>
      <EditProvider>
        <Router source={hashIntegration()}>
          <App />
        </Router>
      </EditProvider>
    </AuthenticationProvider>
  ),
  document.getElementById('root') as HTMLElement
);
