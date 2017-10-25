import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import App from './App';
import Hello from './components/Hello/View';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
    <Hello name='typescript' level={3} />,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
