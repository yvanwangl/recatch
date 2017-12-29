import * as React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import './index.css';

export interface LinkFormProps {
    handleCancel: () => void;
    onFormSubmit: Function;
    openDialog: boolean;
}

export interface LinkFormState {
    openSnackbar: boolean;
}

const delayTime = 2000;
class LinkForm extends React.Component<LinkFormProps & InjectedFormProps, LinkFormState> {

    constructor(props: LinkFormProps & InjectedFormProps) {
        super(props);
        this.state = {
            openSnackbar: false
        };
    }

    //表单验证逻辑
    static validate(values: any) {
        const errors = { reason: '' };

        if (!values.reason) {
            errors.reason = '审核不通过原因不能为空';
        }

        return errors;
    }

    handleConfirm = (values: any) => {
        let { onFormSubmit, handleCancel } = this.props;
        values['status'] = 'Invalid';
        onFormSubmit(values).then((result: any) => {
            if (result.success) {
                this.setState({ openSnackbar: true });
                setTimeout(handleCancel, delayTime);
            }
        })
    };

    render() {
        let { handleSubmit, handleCancel, openDialog } = this.props;
        let { openSnackbar } = this.state;

        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onClick={handleCancel}
            />,
            <FlatButton
                label="确定"
                primary={true}
                keyboardFocused={true}
                onClick={handleSubmit(this.handleConfirm)}
            />,
        ];

        return (
            <Dialog
                title='友链审核'
                actions={actions}
                modal={false}
                open={openDialog}
                onRequestClose={handleCancel}
            >
                <form className='AuditLink-form'>
                    <div className='AuditLink-form-item'>
                        <Field
                            name="reason"
                            component={TextField as any}
                            props={{
                                fullWidth: true,
                                hintText: '审核不通过原因',
                                floatingLabelText: '审核不通过原因',
                                multiLine: true,
                                rows: 2,
                                rowsMax: 4
                            } as any}
                        />
                    </div>
                </form>
                <Snackbar
                    open={openSnackbar}
                    message="友链审核成功 :)"
                    autoHideDuration={delayTime}
                    style={{ textAlign: 'center' }}
                />
            </Dialog>
        );
    }
}

export default reduxForm({
    form: 'linkForm',
    validate: LinkForm.validate
})(LinkForm) as any;