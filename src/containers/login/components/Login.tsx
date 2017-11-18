import * as React from 'react';
import { connect } from 'react-redux';
import { doLogin } from '../actions';
import SigninForm from './SigninForm';
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
        alert();
        this.setState({
            signin: !this.state.signin
        });
    };

    handleSubmit = (values: any) => {
        //alert(values);
        alert(JSON.stringify(values));
    };

    render() {
        return (
            <div className='Login-wrapper'>
                <SigninForm onSubmit={this.handleSubmit} onSignUp={this.handleToggle}/>
            </div>
        );
    }
}

export default Login;