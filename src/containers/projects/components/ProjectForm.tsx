import * as React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import './index.css';

export interface ProjectFormProps {
    handleCancel: () => void;
    onFormSubmit: Function;
    openDialog: boolean;
    type: string;
}

export interface ProjectFormState {
    openSnackbar: boolean;
}

const delayTime = 2000;
class ProjectForm extends React.Component<ProjectFormProps & InjectedFormProps, ProjectFormState> {

    constructor(props: ProjectFormProps & InjectedFormProps) {
        super(props);
        this.state = {
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

    handleConfirm = (values: any) => {
        let { onFormSubmit, handleCancel } = this.props;
        onFormSubmit(values).then((result: any) => {
            if (result.success) {
                this.setState({ openSnackbar: true });
                setTimeout(handleCancel, delayTime);
            }
        })
    };

    render() {
        let { handleSubmit, handleCancel, openDialog, type } = this.props;
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
                title={type == 'create' ? '新增项目' : '修改项目'}
                actions={actions}
                modal={false}
                open={openDialog}
                onRequestClose={handleCancel}
            >
                <form className='EditProject-form'>
                    <div className='EditProject-form-item'>
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
                    <div className='EditProject-form-item'>
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
                    <div className='EditProject-form-item'>
                        <Field
                            name="description"
                            component={TextField as any}
                            props={{
                                fullWidth: true,
                                hintText: '项目描述',
                                floatingLabelText: '项目描述',
                                multiLine: true,
                                rows: 2,
                                rowsMax: 4
                            } as any}
                        />
                    </div>
                    {/* <div style={{ width: '100%' }}>
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
                    </div> */}
                </form>
                <Snackbar
                    open={openSnackbar}
                    message="项目保存成功 :)"
                    autoHideDuration={delayTime}
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