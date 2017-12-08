import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

export interface PrivateRouterState {
    authenticate: boolean;
}

export default class PrivateRouter extends React.Component<any, PrivateRouterState> {

    constructor(props: any) {
        super(props);
        let authenticate = false;
        let user = sessionStorage.getItem('user');
        if (user) {
            let userInfo = JSON.parse(user);
            authenticate = user && userInfo.userId && userInfo.username;
        }
        this.state = {
            authenticate
        };
    }

    componentWillReceiveProps() {
        let { authenticate } = this.props;
        let user = sessionStorage.getItem('user');
        if (user) {
            let userInfo = JSON.parse(user);
            authenticate = user && userInfo.userId && userInfo.username;
        } else {
            authenticate = false;
        }
        this.setState({
            authenticate
        });
    }

    render() {
        let { component: Component, ...rest } = this.props;
        let { authenticate } = this.state;
        return (
            <Route {...rest} render={props => (
                authenticate ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }} />
                    )
            )}
            />
        );
    }
}