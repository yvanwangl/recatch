import * as React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import FlatButton from 'material-ui/FlatButton';
import './index.css';

export interface CommentInputProps {
    parentId: string;
    parentName: string;
    postId: string;
    saveComment: Function;
    cancelComment: Function;
}

class CommentInput extends React.Component<CommentInputProps & InjectedFormProps> {
    constructor(props: CommentInputProps & InjectedFormProps) {
        super(props);
        this.state = {
            name: '',
            commentContent: '',
            contentPlaceholder: '回复一下：',
            remainWords: 200
        };
    }

    static validate(values: any) {
        const errors = { commentContent: '' };

        if (!values.commentContent) {
            errors.commentContent = '留言内容不能为空  : )';
        }

        return errors;
    }

    // _setName = (event) => {
    //     this.setState({
    //         name: event.target.value
    //     });
    // }

    // _setContent = (event) => {
    //     var commentContent = event.target.value;
    //     this.setState({
    //         commentContent: commentContent,
    //         remainWords: 200 - commentContent.length
    //     });
    //     this.refs.contentError.innerHTML = null;
    // }

    // _saveComment = () => {
    //     let { saveComment, parentId, blogId, closeInput } = this.props;
    //     let commentParentId = parentId || '';
    //     let commentContent = this.state.commentContent;
    //     let name = this.state.name;
    //     let that = this;
    //     //表单验证
    //     if (commentContent == '') {
    //         return this.refs.contentError.innerHTML = '留言内容不能为空 :)';
    //     }
    //     if (commentContent.length > 200) {
    //         return this.refs.contentError.innerHTML = '留言最多说200字 :)';
    //     }
    //     commentContent = commentContent.replace(/<[^><]*script[^><]*>/ig, '');
    //     commentContent = commentContent.replace(/<[\/\d\w]*>/ig, '');
    //     if (name == '') {
    //         name = '匿名者';
    //     }
    //     saveComment({
    //         parentId: commentParentId,
    //         blogId: blogId,
    //         name: name,
    //         commentContent: commentContent
    //     }, function () {
    //         //回复子评论要关闭输入框
    //         if (closeInput) {
    //             closeInput(true);
    //         } else {
    //             //回复文章要重置输入框
    //             that.setState({
    //                 name: '',
    //                 commentContent: '',
    //                 remainWords: 200
    //             });
    //         }
    //     });

    // }
    handleSave = (values: any) => {
        let { parentId, postId, saveComment } = this.props;
        Object.assign(values, { parentId, postId });
        saveComment(values);
    };

    componentWillMount() {
        let { parentId, parentName } = this.props;
        if (parentId != '') {
            this.setState({
                contentPlaceholder: `回复 @${parentName}：`
            });
        }
    }

    render() {
        let { parentId, parentName, handleSubmit, cancelComment } = this.props;
        let contentPlaceholder = parentId != '' ? `回复 @${parentName}：` : '回复一下：';
        return (
            <div className="CommentInput">
                <form className="CommentInput-commentForm">
                    <div className='CommentInput-form-item'>
                        <Field
                            name="name"
                            component={TextField as any}
                            props={{
                                fullWidth: true,
                                hintText: '昵称：',
                                floatingLabelText: '昵称：'
                            } as any}
                        />
                    </div>
                    <div className='CommentInput-form-item'>
                        <Field
                            name="commentContent"
                            component={TextField as any}
                            props={{
                                fullWidth: true,
                                hintText: contentPlaceholder,
                                floatingLabelText: contentPlaceholder
                            } as any}
                        />
                    </div>
                    {/* <div className="name formItem">
                        <label htmlFor="name">昵称：</label>
                        <input type="text" name="name" value={this.state.name} placeholder="昵称：" onChange={this.setName} />
                    </div>
                    <div className="commentWords formItem">
                        <label htmlFor="content">回复：</label>
                        <textarea name="content" value={this.state.commentContent} placeholder={this.state.contentPlaceholder} onChange={this.setContent}>
                        </textarea>
                        <span className="error" ref="contentError"></span>
                    </div>
                    <div className="commentInfo">
                        <span className="remainWords">还可以输入<span>{this.state.remainWords}</span>字</span>
                        <span className="saveComment" onClick={this.saveComment}>
                            发布
                        </span>
                    </div> */}
                    <div className='CommentInput-buttons'>
                        <FlatButton secondary={true} label='取消' onClick={() => cancelComment()} />
                        <FlatButton primary={true} label='发布' onClick={handleSubmit(this.handleSave)} />
                    </div>

                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'comment',
    validate: CommentInput.validate,
})(CommentInput) as any;