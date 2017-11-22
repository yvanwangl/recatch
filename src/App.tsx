import * as React from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './containers/home/Home';
import Login from './containers/login/components/Login';
import './App.css';

export interface AppState {
    drawerOpen: boolean;
}

class App extends React.Component<object, AppState> {

    render() {
        return (
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/" component={Home} />
            </Switch>
        );
    }
}

export default App;