// @ts-ignore
import {Router} from 'director'

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
console.log(Router)
ReactDOM.render(
  <App/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker()

