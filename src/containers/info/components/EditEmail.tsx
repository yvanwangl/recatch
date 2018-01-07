import * as React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import './index.css';

export interface EditEmailProps {
    onSubmit: Function;
}

export interface EditEmailState {
    openSnackbar: boolean;
}

class EditEmail extends React.Component<EditEmailProps & InjectedFormProps, EditEmailState> {

    constructor(props: EditEmailProps & InjectedFormProps) {
        super(props);
        this.state = {
            openSnackbar: false
        };
    }

    //表单验证逻辑
    static validate(values: any) {
        const errors = { email: ''};

        if (!values.email) {
            errors.email = '邮箱不可为空';
        }

        return errors;
    }

    //表单提交事件
    onFormSubmit = (values: any) => {
        let { onSubmit } = this.props;
        onSubmit(values).then((result: any) => {
            if (result.success) {
                this.setState({ openSnackbar: true });
            }
        });
    };

    render() {
        const { handleSubmit } = this.props;
        const { openSnackbar } = this.state;
        return (
            <div>
                <form className='EditPost-form'>
                    <div className='EditPost-form-item'>
                        <Field
                            name="email"
                            component={TextField as any}
                            props={{
                                fullWidth: true,
                                hintText: '设置邮箱',
                                floatingLabelText: '设置邮箱'
                            } as any}
                        />
                    </div>
                </form>
                <div style={{ marginTop: 12, paddingLeft: 30 }}>
                    <RaisedButton
                        label="设置"
                        primary={true}
                        onClick={handleSubmit(this.onFormSubmit)}
                    />
                </div>
                <Snackbar
                    open={openSnackbar}
                    message="邮箱保存成功 :)"
                    autoHideDuration={2000}
                    style={{ textAlign: 'center' }}
                />
            </div>

        );
    }
}


export default reduxForm({
    form: 'editEmail',
    validate: EditEmail.validate
})(EditEmail) as any;