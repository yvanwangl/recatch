import createHistory from 'history/createBrowserHistory';

const history = createHistory();

export const handleNavClick = (target: string, state?: object) => () => history.push(target, state);

export const locationRedirect = handleNavClick;

export default history;