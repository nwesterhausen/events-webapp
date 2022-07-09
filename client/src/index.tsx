/* @refresh reload */
import { render } from 'solid-js/web';

import 'bootswatch/dist/vapor/bootstrap.css';
import './index.css';
import App from './App';

render(() => <App />, document.getElementById('root') as HTMLElement);
