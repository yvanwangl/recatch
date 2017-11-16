import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
//import { TextField } from 'redux-form-material-ui';
import { doLogin } from '../actions';

export interface LoginDispatch {
    doLogin: Function;
    fields: {
        username: any;
        password: any;
    }
}

function mapDispatchToProps(dispatch: Function) {
    return {
        doLogin: (loginInfo: any) => dispatch(doLogin(loginInfo))
    };
}

const required = (value: any) => (value == null ? 'Required' : undefined);

@(connect(null, mapDispatchToProps) as any)
class Login extends React.Component<LoginDispatch & InjectedFormProps> {

    static validate(values: any) {
        const errors = { username: '', password: '' };
    
        if (!values.username) {
          errors.username = 'Username is required.';
        }
    
        if (!values.password) {
          errors.password = 'Password is required.';
        }
    
        return errors;
      }

    handleSubmit = (values: any)=>{
        alert(values);
    };

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <Field
                    name="username"
                    type="text"
                    component="input"
                />
                <Field name="firstName" component="input" label="First Name"/>
                <Field
                    name="password"
                    component="input"
                    validate={required}
                    ref="Password"
                    withRef
                />
            </form>
        );
    }
}

export default reduxForm({
    form: 'login',
    validate: Login.validate,
  })(Login);