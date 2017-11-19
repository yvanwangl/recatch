import * as React from 'react';
import { connect } from 'react-redux';
import { doLogin } from '../actions';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import './index.css';

export interface LoginProps {
    doLogin: Function;
}

interface LoginState {
    signin: boolean;
}

function mapDispatchToProps(dispatch: Function) {
    return {
        doLogin: (loginInfo: any) => dispatch(doLogin(loginInfo))
    };
}

@(connect(null, mapDispatchToProps) as any)
class Login extends React.Component<LoginProps, LoginState> {

    constructor(props: LoginProps){
        super(props);
        this.state = {
            signin: true
        };
    }

    handleToggle = (e: any): void=>{
        this.setState({
            signin: !this.state.signin
        });
    };

    handleSubmit = (values: any) => {
        let {doLogin} = this.props;
        values['type'] = this.state.signin ? 'signin' : 'signup';
        doLogin(values);
    };

    render() {
        const {signin} = this.state;
        return (
            <div className='Login-wrapper'>
                {
                    signin ?
                    <SigninForm onSubmit={this.handleSubmit} onSignUp={this.handleToggle}/>:
                    <SignupForm onSubmit={this.handleSubmit} onSignIn={this.handleToggle}/>
                }
            </div>
        );
    }
}

export default Login;