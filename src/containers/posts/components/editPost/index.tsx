import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ListIcon from 'material-ui/svg-icons/action/list';
import TabbarTitle from '../../../../components/tabbarTitle/TabbarTitle';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import '../index.css';

export interface EditPostProps {
    initData: any;
    onSubmit: Function;
}

class EditPost extends React.Component<EditPostProps & InjectedFormProps> {

    state = {
        stepIndex: 0
    };

    static validate(values: any) {
        const errors = { coverImg: '', title: '', author: '' };

        if (!values.coverImg) {
            errors.coverImg = '封面图不能为空';
        }

        if (!values.title) {
            errors.title = '文章标题不能为空';
        }

        if (!values.author) {
            errors.author = '作者不能为空';
        }

        return errors;
    }

    handleCancel = () => {
        const { stepIndex } = this.state;
        if (stepIndex > 0) {
            this.setState({ stepIndex: stepIndex - 1 });
        }
    };

    render() {
        const { handleSubmit } = this.props;

        return (
            <div>
                <TabbarTitle
                    title='新增文章'
                    buttons={
                        [
                            <FlatButton key='list' label="列表" icon={<ListIcon />} primary={true} />
                        ]
                    }
                />
                <form className='EditPost-form'>
                    <div className='EditPost-form-item'>
                        <Field
                            name="coverImg"
                            component={TextField as any}
                            props={{
                                fullWidth: true,
                                hintText: '封面图',
                                floatingLabelText: '封面图'
                            } as any}
                        />
                    </div>
                    <div className='EditPost-form-item'>
                        <Field
                            name="title"
                            component={TextField as any}
                            props={{
                                fullWidth: true,
                                hintText: '文章标题',
                                floatingLabelText: '文章标题'
                            } as any}
                        />
                    </div>
                    <div className='EditPost-form-item'>
                        <Field
                            name="author"
                            component={TextField as any}
                            props={{
                                fullWidth: true,
                                hintText: '作者',
                                floatingLabelText: '作者'
                            } as any}
                        />
                    </div>
                </form>
                <div style={{ marginTop: 12 }}>
                    <FlatButton
                        label="取消"
                        onClick={this.handleCancel}
                        style={{ marginRight: 12 }}
                    />
                    <RaisedButton
                        label="保存"
                        primary={true}
                        onClick={handleSubmit}
                    />
                </div>
            </div>

        );
    }
}

export default reduxForm({
    form: 'editPost',
    validate: EditPost.validate,
})(EditPost) as any;