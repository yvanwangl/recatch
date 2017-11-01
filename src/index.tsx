import * as React from 'react';
import * as ReactDOM from 'react-dom';
import StoreState from './store/types';
import {Provider} from 'react-redux';
import App from './App';
import configStore from './store/index';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

declare global {
    interface Window {
        __INITIAL_STATE__?: StoreState
    }
}

const initialState = window.__INITIAL_STATE__ || {orm: {}, ui: {}};
const store = configStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
