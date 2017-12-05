import * as React from 'react';
// import CommentInput from '../CommentInput/CommentInput';
import { dateFormat } from '../../../utils/util';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import './index.css';

export interface CommentItemPorps {
    comment: any;
    parentName: string;
    handleDelete: Function;
}

export default class CommentItem extends React.Component<CommentItemPorps> {
    constructor(props: CommentItemPorps) {
        super(props);
        this.state = {
            addChildComment: false,
            agreeClick: false,
            disAgreeClick: false,
        };
    }

    // _replyClick(event) {
    //     this.setState({
    //         addChildComment: !this.state.addChildComment
    //     });
    // }

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
        let { comment, parentName, handleDelete } = this.props;
        // var agreeClick = !this.state.agreeClick ? this.agreeClick : null;
        // var disAgreeClick = !this.state.disAgreeClick ? this.disAgreeClick : null;
        var commentItem = comment['parentId'] == '' ? 'commentItem' : 'commentItem childComment';
        return (
            <div className={commentItem}>
                <div className="commentatorInfo">
                    <img src='' alt="默认头像" className="avator" />
                    <p className="commentatorName">{comment['name']}</p>
                    <p className="commentTime">{dateFormat(comment['commentTime'], 2)} {parentName == '' ? '如是说：' : '回复：@' + parentName}</p>
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
                    <span className="delete" onClick={() => handleDelete(comment['id'])}>
                        <DeleteIcon />
                        <i>删除</i>
                    </span>
                </div>
                {/* {
                    this.state.addChildComment ?
                        <CommentInput parentId={comment['_id']}
                            parentName={comment['name']}
                            blogId={blogId}
                            saveComment={commentActions.saveComment}
                            closeInput={this.closeInput.bind(this)} />
                        : null
                } */}
            </div>
        );
    }
}