/* @refresh reload */
import { render } from 'solid-js/web';

import 'bootswatch/dist/superhero/bootstrap.css';
import './index.scss';

import { hashIntegration, Router } from 'solid-app-router';
import App from './App';
import { AuthenticationProvider } from './providers/Auth';

render(
  () => (
    <AuthenticationProvider>
      <Router source={hashIntegration()}>
        <App />
      </Router>
    </AuthenticationProvider>
  ),
  document.getElementById('root') as HTMLElement
);
