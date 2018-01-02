import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userAuth } from '../../utils/util';

export interface PrivateRouterState {
    authenticate: boolean;
    admin: boolean;
}

let adminRouters = ['/links'];

export default class PrivateRouter extends React.Component<any, PrivateRouterState> {

    constructor(props: any) {
        super(props);
        this.state = userAuth();
    }

    componentWillReceiveProps() {
        let userPermission = userAuth();
        this.setState(userPermission);
    }

    render() {
        let { component: Component, ...rest } = this.props;
        let { authenticate, admin } = this.state;
        //对管理员权限的路由进行拦截
        if(adminRouters.indexOf(this.props.path) > -1) {
            if(!(authenticate && admin)) {
                return null;
            }
        }
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