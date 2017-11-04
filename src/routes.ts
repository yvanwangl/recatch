import App from './App';
import Home from './containers/home/Home';

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