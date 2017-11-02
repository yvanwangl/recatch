import App from './App';
import {Home} from './containers/home/index';

const routes = [
    {
        component: App,
        routes: [
            {
                path: '/',
                exact: true,
                component: Home
            }
        ]
    }
];

export default routes;