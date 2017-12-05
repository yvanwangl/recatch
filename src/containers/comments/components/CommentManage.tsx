import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import CommentItem from './CommentItem';
import StoreState from '../../../store/types';
import { formatComments } from '../../../utils/util';
import { fetchComments, deleteComment } from '../actions';
import { commentSelector } from '../selectors';
require('./index.css');

//评论生成迭代器
function commentIterator(childComments: any, commentItems: any, parentName: any, deleteComment: Function) {
    childComments.map((childComment: any) => {
        commentItems.push(
            <CommentItem
                key={childComment['_id']}
                comment={childComment}
                parentName={parentName}
                handleDelete={deleteComment}
            />
        )
        if (childComment['children']) {
            commentIterator(childComment['children'], commentItems, childComment['name'], deleteComment);
        }
    });
}

export interface CommentManageProps {
    comments: any;
    fetchComments: Function;
    deleteComment: Function;
}

function mapStateToProps(state: StoreState) {
    return {
        comments: commentSelector(state)
    };
}

function mapDispatchToProps(dispatch: Function) {
    return {
        fetchComments: () => dispatch(fetchComments()),
        deleteComment: (commentId: string) => dispatch(deleteComment(commentId))
    };
}

@(connect(mapStateToProps, mapDispatchToProps) as any)
class CommentManage extends React.Component<CommentManageProps> {
    constructor(props: CommentManageProps) {
        super(props);
    }

    componentDidMount() {
        let { comments, fetchComments } = this.props;
        if (comments.length == 0) {
            fetchComments();
        }
    }

    render() {
        let { comments, deleteComment } = this.props;
        /**
         * 对评论进行序列化操作
         * 对评论按日期进行倒叙
         * 对评论进行子评论组织
         */
        let newComments = formatComments(comments);
        let commentList = newComments.map((comment: any) => {
            let commentItems: Array<React.ReactNode> = [];
            commentItems.push(
                <CommentItem
                    key={comment['_id']}
                    comment={comment}
                    parentName=''
                    handleDelete={deleteComment}
                />
            );
            if (comment['children']) {
                commentIterator(comment['children'], commentItems, comment['name'], deleteComment);
            }
            return (
                <div>
                    <h1>{comment.postName}</h1>
                    {commentItems}
                </div>
            );
        });
        return (
            <div className="commentWrap">
                {commentList}
            </div>
        );
    }
}

export default withRouter(CommentManage);