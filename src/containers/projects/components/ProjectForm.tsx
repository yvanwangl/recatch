import * as React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { TextField, Toggle } from 'redux-form-material-ui';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

export interface ProjectFormProps {
    onFormSubmit: Function;
    openDialog: boolean;
}

export interface ProjectFormState {
    open: boolean;
    openSnackbar: boolean;
}

class ProjectForm extends React.Component<ProjectFormProps & InjectedFormProps, ProjectFormState> {

    constructor(props: ProjectFormProps & InjectedFormProps) {
        super(props);
        this.state = {
            open: this.props.openDialog,
            openSnackbar: false
        };
    }

    //表单验证逻辑
    static validate(values: any) {
        const errors = { name: '', link: '', description: '' };

        if (!values.name) {
            errors.name = '项目名称不能为空';
        }

        if (!values.link) {
            errors.link = '项目链接不能为空';
        }

        if (!values.description) {
            errors.description = '项目描述不能为空';
        }

        return errors;
    }

    handleCancel = ()=> {
        this.setState({
            open: false
        });
    };

    handleConfirm = (values: any)=> {
        let {onFormSubmit} = this.props;
        onFormSubmit(values).then((result: any) => {
            if (result.success) {
                this.setState({ openSnackbar: true, open: false });
            }
        })
    };

    render() {
        let { handleSubmit } = this.props;
        let {open, openSnackbar} = this.state;

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleCancel}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={handleSubmit(this.handleConfirm)}
            />,
        ];

        return (
            <Dialog
                title="项目"
                actions={actions}
                modal={false}
                open={open}
                onRequestClose={this.handleCancel}
            >
                <form className='EditPost-form'>
                    <div className='EditPost-form-item'>
                        <Field
                            name="name"
                            component={TextField as any}
                            props={{
                                fullWidth: true,
                                hintText: '项目名称',
                                floatingLabelText: '项目名称'
                            } as any}
                        />
                    </div>
                    <div className='EditPost-form-item'>
                        <Field
                            name="link"
                            component={TextField as any}
                            props={{
                                fullWidth: true,
                                hintText: '项目链接',
                                floatingLabelText: '项目链接'
                            } as any}
                        />
                    </div>
                    <div className='EditPost-form-item'>
                        <Field
                            name="description"
                            component={TextField as any}
                            props={{
                                fullWidth: true,
                                hintText: '项目描述',
                                floatingLabelText: '项目描述'
                            } as any}
                        />
                    </div>
                    <div style={{ width: '100%' }}>
                        <div className='EditPost-form-item-toggle'>
                            <Field
                                name="postStatus"
                                component={Toggle as any}
                                props={{
                                    label: '是否发布',
                                    labelStyle: { color: 'rgb(124, 124, 124)' }
                                } as any}
                            />
                        </div>
                    </div>
                </form>
                <Snackbar
                    open={openSnackbar}
                    message="项目保存成功 :)"
                    autoHideDuration={2000}
                    style={{ textAlign: 'center' }}
                />
            </Dialog>
        );
    }
}

export default reduxForm({
    form: 'projectForm',
    validate: ProjectForm.validate
})(ProjectForm) as any;