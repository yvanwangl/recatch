import * as React from 'react';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ListIcon from 'material-ui/svg-icons/action/list';
import TabbarTitle from '../../../components/tabbarTitle/TabbarTitle';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { TextField, SelectField, Toggle } from 'redux-form-material-ui';
import Editor from './Editor';
import './index.css';

export interface EditPostProps {
    initData: any;
    labels: any;
    onCancel: Function;
    onSubmit: Function;
    uploadCoverImg: Function;
    actions: any;
}

export interface EditPostState {
    coverImg: string;
    values: Array<string | number>;
}

// const names = [
//     'Oliver Hansen',
//     'Van Henry',
//     'April Tucker',
//     'Ralph Hubbard',
//     'Omar Alexander',
//     'Carlos Abbott',
//     'Miriam Wagner',
//     'Bradley Wilkerson',
//     'Virginia Andrews',
//     'Kelly Snyder',
// ];


class EditPost extends React.Component<EditPostProps & InjectedFormProps, EditPostState> {

    upload: any;

    state = {
        coverImg: '',
        values: []
    };

    //表单验证逻辑
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

    //标签下拉列表
    menuItems(values: any) {
        let { labels } = this.props;
        return labels.map(({ id, name }: any) => (
            <MenuItem
                key={id}
                insetChildren={true}
                checked={values && values.indexOf(id) > -1}
                value={id}
                primaryText={name}
            />
        ));
    }

    //标签变更事件
    handleLabelChange = (values: any) => this.setState({ values });

    //是否发布变更事件
    handleStatusChange = (event: object, isInputChecked: boolean) => console.log(isInputChecked);

    //取消按钮点击事件
    handleCancel = () => {
        let { onCancel } = this.props;
        onCancel();
    };

    //上传封面图
    handleCoverImg = (e: any) => {
        let { uploadCoverImg, change } = this.props;
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append('coverImg', file);
        uploadCoverImg(formData).then((result: any) => {
            if (result.success) {
                this.setState({
                    coverImg: result.data
                });
                change('coverImg', result.data);
            }
        });
    };

    //获取文章内容
    handleEditorChange = (model: any) => {
        let { change } = this.props;
        change('content', model);
    };

    render() {
        const { handleSubmit } = this.props;
        const { coverImg, values } = this.state;
        const handleLabelChange = this.handleLabelChange;
        const handleEditorChange = this.handleEditorChange;

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
                            value={coverImg}
                            props={{
                                fullWidth: true,
                                hintText: '封面图',
                                floatingLabelText: '封面图',
                                disabled: true,
                                value: coverImg
                            } as any}
                        />
                        <div style={{ height: 36, marginTop: 16 }}>
                            <input id="myInput" type="file" ref={(ref) => this.upload = ref} style={{ display: 'none' }} onChange={this.handleCoverImg} />
                            <RaisedButton
                                label="封面图"
                                secondary={true}
                                onClick={(e) => this.upload.click()}
                            />
                        </div>
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
                    <div className='EditPost-form-item'>
                        <Field
                            name="labels"
                            component={SelectField as any}
                            props={{
                                multiple: true,
                                fullWidth: true,
                                hintText: '标签',
                                floatingLabelText: '标签',
                                value: values,
                                onChange: handleLabelChange
                            } as any}
                        >
                            {this.menuItems(values)}
                        </Field>
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
                        <div className='EditPost-form-item-toggle'>
                            <Field
                                name="updateDate"
                                component={Toggle as any}
                                props={{
                                    label: '是否更新',
                                    labelStyle: { color: 'rgb(124, 124, 124)' }
                                } as any}
                            />
                        </div>
                    </div>
                    <div style={{ width: '100%', marginTop: 40 }}>
                        <Field
                            name="content"
                            component={Editor as any}
                            props={{
                                onChange: handleEditorChange
                            } as any}
                        />

                    </div>
                </form>
                <div style={{ marginTop: 12, paddingLeft: 30 }}>
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
    initialValues: {
        postStatus: true,
        updateDate: true
    }
})(EditPost) as any;