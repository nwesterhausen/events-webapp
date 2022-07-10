/* @refresh reload */
import { render } from 'solid-js/web';

import 'bootswatch/dist/vapor/bootstrap.css';
import './index.scss';

import { Router } from 'solid-app-router';
import App from './App';
import { AuthenticationProvider } from './providers/Auth';

render(
  () => (
    <AuthenticationProvider>
      <Router>
        <App />
      </Router>
    </AuthenticationProvider>
  ),
  document.getElementById('root') as HTMLElement
);
