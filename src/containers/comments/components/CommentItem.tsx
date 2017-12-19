import * as React from 'react';
import CommentInput from './CommentInput';
import { dateFormat } from '../../../utils/util';
//import DeleteIcon from 'material-ui/svg-icons/action/delete';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import './index.css';

export interface CommentItemPorps {
    comment: any;
    parentName: string;
    handleAdd: Function;
    handleDelete: Function;
}

export interface CommentItemState {
    addChildComment: boolean;
    open: boolean;
    commentId: string;
}

export default class CommentItem extends React.Component<CommentItemPorps, CommentItemState> {
    constructor(props: CommentItemPorps) {
        super(props);
        this.state = {
            addChildComment: false,
            open: false,
            commentId: ''
        };
    }

    //回复按钮点击事件
    handleReply = () => {
        this.setState({
            addChildComment: !this.state.addChildComment
        });
    }

    //取消按钮点击事件
    handleCancel = () => {
        this.setState({
            addChildComment: false
        });
    };

    //提交按钮点击事件
    handleSave = (comment: any) => {
        let { handleAdd } = this.props;
        handleAdd(comment).then((result: any) => {
            if (result.success) {
                this.setState({
                    addChildComment: false
                });
            }
        });
    };

    //删除按钮点击事件
    handleDelete = (commentId: string) => {
        this.setState({
            open: true,
            commentId
        });
    };

    //关闭弹窗事件
	dialogCancel = () => {
		this.setState({ open: false, commentId: '' });
	};

	//弹窗确认删除评论
	dialogConfirm = () => {
        let { handleDelete } = this.props;
		this.setState({ open: false });
		handleDelete(this.state.commentId);
	};

    // _agreeClick(event) {
    //     let { comment, commentActions } = this.props;
    //     let agree = comment['agree'];
    //     let disagree = comment['disagree'];
    //     if (!this.state.disAgreeClick) {
    //         agree += 1;
    //     } else {
    //         agree += 1;
    //         disagree -= 1;
    //     }
    //     commentActions.likeComment({
    //         commentId: comment['_id'],
    //         agree: agree,
    //         disagree: disagree
    //     });
    //     this.setState({
    //         agreeClick: true
    //     });
    // }

    // _disAgreeClick(event) {
    //     let { comment, commentActions } = this.props;
    //     let agree = comment['agree'];
    //     let disagree = comment['disagree'];
    //     if (!this.state.agreeClick) {
    //         disagree += 1;
    //     } else {
    //         agree -= 1;
    //         disagree += 1;
    //     }
    //     commentActions.likeComment({
    //         commentId: comment['_id'],
    //         agree: agree,
    //         disagree: disagree
    //     });
    //     this.setState({
    //         disAgreeClick: true
    //     });
    // }

    // _deleteClick(event) {
    //     let { comment, commentActions, authCookie } = this.props;
    //     commentActions.deleteComment(comment['_id'], authCookie);
    // }

    // closeInput(is_success) {
    //     if (is_success) {
    //         this.setState({
    //             addChildComment: false
    //         });
    //     }
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return !(nextProps == this.props && nextState == this.state);
    // }

    render() {
        let { comment, parentName } = this.props;
        // var agreeClick = !this.state.agreeClick ? this.agreeClick : null;
        // var disAgreeClick = !this.state.disAgreeClick ? this.disAgreeClick : null;
        var commentItem = comment['parentId'] == '' ? 'commentItem' : 'commentItem childComment';

        //dialog Actions
		const actions = [
			<FlatButton
				label="取消"
				primary={true}
				onClick={this.dialogCancel}
			/>,
			<FlatButton
				label="确认"
				primary={true}
				keyboardFocused={true}
				onClick={this.dialogConfirm}
			/>,
        ];
        
        return (
            <div className={commentItem}>
                <div className="commentatorInfo">
                    <p className="commentTime">{comment['name']} {dateFormat(comment['commentTime'], 2)} {parentName == '' ? '如是说：' : '回复：@' + parentName}</p>
                </div>
                <p className="commentContent">
                    {comment['commentContent']}
                </p>
                <div className="commentAction">
                    {/* <span className="agree" onClick={agreeClick}>
                        <Icon type="like" className="icon" />
                        <i>赞同( {comment['agree']} )</i>
                    </span>
                    <span className="disagree" onClick={disAgreeClick}>
                        <Icon type="dislike" className="icon" />
                        <i>反对( {comment['disagree']} )</i>
                    </span>
                    <span className="reply" onClick={this.replyClick}>
                        <Icon type="message" className="icon" />
                        <i>回复</i>
                    </span> */}
                    {/*<span className="delete" onClick={this.deleteClick}><Icon type="close" className="icon"/>删除</span>*/}
                    {/* <span className="delete" onClick={() => handleDelete(comment['id'])}>
                        <DeleteIcon />
                        <i>删除</i>
                    </span> */}
                    <FlatButton label="删除" secondary={true} onClick={() => this.handleDelete(comment['id'])} />
                    <FlatButton label="回复" primary={true} onClick={this.handleReply} />
                </div>
                <Dialog
                    title="删除提示"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.dialogCancel}
                >
                    确认删除该评论吗？该评论的下级子评论也会一并删除！
                </Dialog>
                {
                    this.state.addChildComment ?
                        <CommentInput
                            parentId={comment['id']}
                            parentName={comment['name']}
                            postId={comment['postId']}
                            saveComment={this.handleSave}
                            cancelComment={this.handleCancel}
                        />
                        : null
                }
            </div>
        );
    }
}