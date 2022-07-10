/* @refresh reload */
import { render } from 'solid-js/web';

import 'bootswatch/dist/vapor/bootstrap.css';
import './index.css';
import App from './App';
import { AuthenticationProvider } from './providers/Auth';
import { hashIntegration, Router } from 'solid-app-router';

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
