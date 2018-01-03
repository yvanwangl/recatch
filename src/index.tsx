import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import StoreState from './store/types';
import configStore from './store/index';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// import { renderRoutes } from 'react-router-config';
// import routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import orm from './reducer/orm';
//import bootstrap from './bootstrap';
import './index.css';

declare global {
    interface Window {
        __INITIAL_STATE__?: StoreState
    }
}

const initialState = { orm: orm.getEmptyState(), ui: { dashboard: {} } };
const store = configStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
