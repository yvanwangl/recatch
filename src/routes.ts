import App from './App';
import Home from './containers/home/Home';
import PostList from './containers/posts/components/PostList';

const routes = [
    {
        component: App,
        routes: [
            {
                path: '/',
                exact: true,
                component: Home
            },
            {
                path: '/posts',
                component: PostList,
                routes: [

                ]
            }
        ]
    }
];

export default routes;