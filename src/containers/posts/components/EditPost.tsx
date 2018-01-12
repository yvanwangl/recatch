import * as React from 'react';
import Snackbar from 'material-ui/Snackbar';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ListIcon from 'material-ui/svg-icons/action/list';
import TabbarTitle from '../../../components/tabbarTitle/TabbarTitle';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { TextField, SelectField, Toggle } from 'redux-form-material-ui';
import Editor from './Editor';
import scrollToFirstError from '../../../utils/handleSubmitFail';
import './index.css';

export interface EditPostProps {
    allLabels: any;
    onCancel: Function;
    onSubmit: Function;
    uploadCoverImg: Function;
    editTitle: string;
}

export interface EditPostState {
    selectedLabels: Array<string | number>;
    openSnackbar: boolean;
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
const IMAGE_SIZE = 1000 * 1000;

const maxSize = (val: any) => val && val >= IMAGE_SIZE ? '封面图尺寸不能大于1M' : undefined;

class EditPost extends React.Component<EditPostProps & InjectedFormProps, EditPostState> {

    upload: any;

    constructor(props: EditPostProps & InjectedFormProps) {
        super(props);
        console.log(props);
        this.state = {
            selectedLabels: props.initialValues['labels'] || [],
            openSnackbar: false
        };
    }

    //表单验证逻辑
    static validate(values: any) {
        const errors = { coverImg: '', title: '', author: '' };

        // if (!values.coverImg) {
        //     errors.coverImg = '封面图不能为空';
        // }

        if (!values.title) {
            errors.title = '文章标题不能为空';
        }

        if (!values.author) {
            errors.author = '作者不能为空';
        }

        return errors;
    }

    //标签下拉列表
    menuItems(selectedLabels: any) {
        let { allLabels } = this.props;
        return allLabels.map(({ id, name }: any) => (
            <MenuItem
                key={id}
                insetChildren={true}
                checked={selectedLabels && selectedLabels.indexOf(id) > -1}
                value={id}
                primaryText={name}
            />
        ));
    }

    //标签变更事件
    handleLabelChange = (selectedLabels: any) => this.setState({ selectedLabels });

    //是否发布变更事件
    handleStatusChange = (event: object, isInputChecked: boolean) => console.log(isInputChecked);

    //取消按钮点击事件
    handleCancel = () => {
        let { onCancel } = this.props;
        onCancel();
    };

    //上传封面图
    handleCoverImg = (e: any) => {
        let { uploadCoverImg, change, blur } = this.props;
        let files = e.target.files;
        if (files.length > 0) {
            let file = files[0];
            if (file.size >= IMAGE_SIZE) {
                blur('coverImg', file.size);
            } else {
                let formData = new FormData();
                formData.append('coverImg', file);
                uploadCoverImg(formData).then((result: any) => {
                    if (result.success) {
                        change('coverImg', result.data);
                    }
                });
            }
        }
    };

    //获取文章内容
    handleEditorChange = (model: any) => {
        let { change } = this.props;
        change('content', model);
    };

    //表单提交事件
    onFormSubmit = (values: any) => {
        let { onSubmit } = this.props;      
        //如果发布，则博客状态为 'Publish', 否则为 'Draft'
        values.postStatus = values.postStatus ? 'Publish' : 'Draft';
        //设置文章概要
        let fragment = document.createElement('div');
        fragment.innerHTML = values.content;
        values.plaintext = fragment.textContent ? fragment.textContent.substr(0, 200) : '';
        onSubmit(values).then((result: any) => {
            if (result.success) {
                this.setState({ openSnackbar: true });
            }
        });
        console.log(values);
    };

    render() {
        const { handleSubmit, editTitle } = this.props;
        const { selectedLabels, openSnackbar } = this.state;
        const handleLabelChange = this.handleLabelChange;
        const handleEditorChange = this.handleEditorChange;

        return (
            <div style={{ paddingBottom: 30 }}>
                <TabbarTitle
                    title={editTitle}
                    buttons={
                        [
                            <FlatButton
                                key='list'
                                label="列表"
                                icon={<ListIcon />}
                                primary={true}
                                onClick={this.handleCancel}
                            />
                        ]
                    }
                />
                <form className='EditPost-form'>
                    <div className='EditPost-form-item'>
                        <Field
                            name="coverImg"
                            component={TextField as any}
                            validate={[maxSize]}
                            props={{
                                fullWidth: true,
                                hintText: '封面图',
                                floatingLabelText: '封面图',
                                disabled: true
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
                                onChange: handleLabelChange
                            } as any}
                        >
                            {this.menuItems(selectedLabels)}
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
                    <div className='EditPost-Editor-wrapper'>
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
                        onClick={handleSubmit(this.onFormSubmit)}
                    />
                </div>
                <Snackbar
                    open={openSnackbar}
                    message="文章保存成功 :)"
                    autoHideDuration={2000}
                    style={{ textAlign: 'center' }}
                />
            </div>

        );
    }
}


export default reduxForm({
    form: 'editPost',
    validate: EditPost.validate,
    onSubmitFail: (errors: any) => scrollToFirstError(errors)
})(EditPost) as any;