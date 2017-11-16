import * as React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import LockIcon from 'material-ui/svg-icons/action/lock-outline';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { doLogin } from '../actions';
import './index.css';

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

    handleSubmit = (values: any) => {
        //alert(values);
        alert(JSON.stringify(values));
    };
 
    render() {
        return (
            <div className='Login-wrapper'>
                <div className='Login-form'>
                    <div style={{ margin: 20, textAlign: 'center' }}>
                        <span className='Login-icon'>
                            <LockIcon color='#fff' style={{ width: 36, height: 36, margin: 12 }} />
                        </span>
                    </div>
                    <h2 className='Login-title'>Login</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <Field
                                name="username"
                                type="text"
                                validate={required}
                                component={() =>
                                    <TextField
                                        hintText='User Name'
                                        floatingLabelText='User Name'
                                    />
                                }
                            />
                        </div>
                        <div>
                            <Field
                                name="password"
                                component={() =>
                                    <TextField
                                        hintText='Password'
                                        floatingLabelText='Password'
                                        type='password'
                                    />
                                }
                                validate={required}
                                ref="Password"
                                withRef
                            />
                        </div>
                        <RaisedButton
                            label="Primary"
                            primary={true}
                            fullWidth={true}
                            style={{marginTop: 8}}
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'login',
    validate: Login.validate,
})(Login);