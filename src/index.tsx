import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import StoreState from './store/types';
import configStore from './store/index';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import orm from './reducer/orm';
//import bootstrap from './bootstrap';
import './index.css';

declare global {
    interface Window {
        __INITIAL_STATE__?: StoreState
    }
}

const initialState = window.__INITIAL_STATE__ || {orm: orm.getEmptyState(), ui:{}};
const store = configStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <StaticRouter>
                {renderRoutes(routes)}
            </StaticRouter>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
