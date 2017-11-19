import * as React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import LockIcon from 'material-ui/svg-icons/action/lock-outline';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { validateUsername } from '../actions';
import './index.css';

interface SignupFormProps {
    onSignIn: ((event: any) => void);
}

//异步验证 用户名 是否存在
const asyncValidate = (loginInfo: any, dispatch: Function) => dispatch(validateUsername(loginInfo)).then((result: any) => {
    if (!result.success) { throw { username: 'That username is taken' } }
});

class SignupForm extends React.Component<InjectedFormProps & SignupFormProps> {

    static validate(values: any) {
        const errors = { username: '', password: '', confirm: '' };

        if (!values.username) {
            errors.username = 'Username is required';
        } else if (values.username.length < 6) {
            errors.username = 'Username length can not be less than 6'
        } else if (values.username.length > 12) {
            errors.username = 'Username length can not be longer than 12'
        } else if (!/^[\w]{6,12}$/.test(values.username)) {
            errors.username = 'Username must contain numbers and letters'
        }

        if (!values.password) {
            errors.password = 'Password is required';
        }

        if (!values.confirm) {
            errors.confirm = 'Confirm Password is required';
        } else if (values.confirm != values.password) {
            errors.confirm = 'Confirm Password Not Equal To Password';
        }

        return errors;
    }

    render() {
        const { handleSubmit, submitting, onSignIn } = this.props;
        return (
            <Paper zDepth={5} circle={true} style={{ width: 500, height: 500 }}>
                <div className='Signup-form'>
                    <div style={{ margin: 20, textAlign: 'center' }}>
                        <span className='Signup-icon'>
                            <LockIcon color='#fff' style={{ width: 36, height: 36, margin: 12 }} />
                        </span>
                    </div>
                    <h2 className='Signup-title'>Sign Up</h2>
                    <form>
                        <div className='Signup-form-item'>
                            <Field
                                name="username"
                                component={TextField as any}
                                props={{
                                    fullWidth: true,
                                    hintText: 'User Name',
                                    floatingLabelText: 'User Name'
                                } as any}
                            />
                        </div>
                        <div className='Signup-form-item'>
                            <Field
                                name="password"
                                component={TextField as any}
                                props={{
                                    fullWidth: true,
                                    hintText: 'Password',
                                    floatingLabelText: 'Password',
                                    type: 'password'
                                } as any}
                            />
                        </div>
                        <div className='Signup-form-item'>
                            <Field
                                name="confirm"
                                component={TextField as any}
                                props={{
                                    fullWidth: true,
                                    hintText: 'Confirm Password',
                                    floatingLabelText: 'Confirm Password',
                                    type: 'password'
                                } as any}
                            />
                        </div>

                        <div className='Signup-up-btn'>
                            <span onClick={onSignIn}>Sign In</span>
                        </div>

                        <RaisedButton
                            label="Sign Up"
                            primary={true}
                            fullWidth={true}
                            style={{ marginTop: 25 }}
                            disabled={submitting}
                            onClick={handleSubmit}
                        />
                    </form>
                </div>
            </Paper>
        );
    }
}

export default reduxForm({
    form: 'signup',
    validate: SignupForm.validate,
    asyncValidate,
    asyncBlurFields: ['username']
})(SignupForm) as any;