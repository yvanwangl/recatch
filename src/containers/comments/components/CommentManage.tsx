import * as React from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import CommentItem from './CommentItem';
import CommentCard from './CommentCard';
import TabbarTitle from '../../../components/tabbarTitle/TabbarTitle';
import StoreState from '../../../store/types';
import { formatComments } from '../../../utils/util';
import { fetchComments, addComment, deleteComment } from '../actions';
import { commentSelector, postSelector } from '../selectors';
import './index.css';

//评论生成迭代器
function commentIterator(childComments: any, commentItems: any, parentName: any, addComment: Function, deleteComment: Function) {
    childComments.map((childComment: any) => {
        commentItems.push(
            <CommentItem
                key={childComment['_id']}
                comment={childComment}
                parentName={parentName}
                handleAdd={addComment}
                handleDelete={deleteComment}
            />
        )
        if (childComment['children']) {
            commentIterator(childComment['children'], commentItems, childComment['name'], addComment, deleteComment);
        }
    });
}

export interface CommentManageProps {
    comments: any;
    fetchComments: Function;
    addComment: Function;
    deleteComment: Function;
    posts: any;
}

export interface CommentManageState {
    expanded: boolean;
}

function mapStateToProps(state: StoreState) {
    return {
        comments: commentSelector(state),
        posts: postSelector(state)
    };
}

function mapDispatchToProps(dispatch: Function) {
    return {
        fetchComments: () => dispatch(fetchComments()),
        addComment: (comment: any) => dispatch(addComment(comment)),
        deleteComment: (commentId: string) => dispatch(deleteComment(commentId))
    };
}

@(connect(mapStateToProps, mapDispatchToProps) as any)
class CommentManage extends React.Component<CommentManageProps, CommentManageState> {
    constructor(props: CommentManageProps) {
        super(props);
        this.state = {
            expanded: false,
        };
    }

    handleExpandChange = (expanded: boolean) => {
        this.setState({ expanded });
    };

    componentDidMount() {
        let { comments, fetchComments } = this.props;
        if (comments.length == 0) {
            fetchComments();
        }
    }

    render() {
        let { comments, addComment, deleteComment } = this.props;
        /**
         * 对评论进行序列化操作
         * 对评论按日期进行倒叙
         * 对评论进行子评论组织
         */
        let newComments = formatComments(comments);
        //对评论按博客进行归类
        let commentMap = {};
        newComments.map((comment: any, index: number) => {
            let commentItems: Array<React.ReactNode> = [];
            commentItems.push(
                <CommentItem
                    key={comment['_id']}
                    comment={comment}
                    parentName=''
                    handleAdd={addComment}
                    handleDelete={deleteComment}
                />
            );
            if (comment['children']) {
                commentIterator(comment['children'], commentItems, comment['name'], addComment, deleteComment);
            }

            if (!commentMap[comment.postId]) {
                //let post = posts.filter((post: any) => post.id == comment.postId)[0] || '';
                commentMap[comment.postId] = [];
                commentMap[comment.postId]['postName'] = comment.postName;
            }
            commentMap[comment.postId].push(commentItems);
        });
        let commentList = Object.keys(commentMap).map(postId => {
            let commentItems = commentMap[postId];
            return (
                <CommentCard key={postId} commentItems={commentItems} />
            );
        });
        return (
            <Paper className='Manage-container'>
                <TabbarTitle title='评论管理' />
                <div className="CommentManage-commentWrap">
                    {commentList}
                </div>
            </Paper>
        );
    }
}

export default CommentManage;