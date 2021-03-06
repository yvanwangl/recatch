import * as React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import LockIcon from 'material-ui/svg-icons/action/lock-outline';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import './index.css';

interface SigninFormProps {
    onSignUp: ((event: any) => void);
}

class SigninForm extends React.Component<InjectedFormProps & SigninFormProps> {

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

    handleFieldBlur = (e: any) => e.preventDefault();

    render() {
        const { handleSubmit, submitting, onSignUp } = this.props;
        return (
            <Paper zDepth={5} circle={true} style={{ width: 420, height: 420 }}>
                <div className='Signin-form'>
                    <div style={{ margin: 20, textAlign: 'center' }}>
                        <span className='Signin-icon'>
                            <LockIcon color='#fff' style={{ width: 36, height: 36, margin: 12 }} />
                        </span>
                    </div>
                    <h2 className='Signin-title'>Sign In</h2>
                    <form onSubmit={handleSubmit as any}>
                        <div className='Signin-form-item'>
                            <Field
                                name="username"
                                component={TextField as any}
                                onBlur={this.handleFieldBlur}
                                props={{
                                    fullWidth: true,
                                    //hintText: 'User Name',
                                    floatingLabelText: 'User Name'
                                } as any}
                            />
                        </div>
                        <div className='Signin-form-item'>
                            <Field
                                name="password"
                                component={TextField as any}
                                onBlur={this.handleFieldBlur}
                                props={{
                                    fullWidth: true,
                                    //hintText: 'Password',
                                    floatingLabelText: 'Password',
                                    type: 'password'
                                } as any}
                            />
                        </div>

                        <div className='Signin-up-btn'>
                            <span onClick={onSignUp}>Sign Up</span>
                        </div>

                        <RaisedButton
                            label="Sign In"
                            type='submit'
                            primary={true}
                            fullWidth={true}
                            style={{ marginTop: 25 }}
                            disabled={submitting}
                        />
                    </form>
                </div>
            </Paper>
        );
    }
}

export default reduxForm({
    form: 'signin',
    validate: SigninForm.validate,
})(SigninForm) as any;