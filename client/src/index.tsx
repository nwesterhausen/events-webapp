/* @refresh reload */
import { render } from 'solid-js/web';

import 'bootswatch/dist/vapor/bootstrap.css';
import './index.css';
import App from './App';
import { AuthenticationProvider } from './providers/Auth';

render(
  () => (
    <AuthenticationProvider>
      <App />
    </AuthenticationProvider>
  ),
  document.getElementById('root') as HTMLElement
);
