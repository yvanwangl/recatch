import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import { doLogin } from '../actions';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import './index.css';

export interface LoginProps {
    doLogin: Function;
    history: any;
    location: any;
}

interface LoginState {
    signin: boolean;
    openSnackbar: boolean;
}

function mapDispatchToProps(dispatch: Function) {
    return {
        doLogin: (loginInfo: any) => dispatch(doLogin(loginInfo))
    };
}

@(connect(null, mapDispatchToProps) as any)
class Login extends React.Component<LoginProps, LoginState> {

    constructor(props: LoginProps) {
        super(props);
        this.state = {
            signin: true,
            openSnackbar: false
        };
    }

    handleToggle = (e: any): void => {
        this.setState({
            signin: !this.state.signin
        });
    };

    handleSubmit = (values: any) => {
        let { doLogin, history, location } = this.props;
        let { from } = location.state || { from: { pathname: '/' } };
        values['type'] = this.state.signin ? 'signin' : 'signup';
        doLogin(values).then((result: any) => {
            if (result.success) {
                history.push(from);
            } else {
                this.setState({
                    openSnackbar: true
                });
            }
        });
    };

    render() {
        const { signin, openSnackbar } = this.state;
        return (
            <div className='Login-wrapper'>
                {
                    signin ?
                        <SigninForm onSubmit={this.handleSubmit} onSignUp={this.handleToggle} /> :
                        <SignupForm onSubmit={this.handleSubmit} onSignIn={this.handleToggle} />
                }
                <Snackbar
                    open={openSnackbar}
                    message="Username Or Password Error : ("
                    autoHideDuration={2000}
                />
            </div>
        );
    }
}

export default withRouter(Login);