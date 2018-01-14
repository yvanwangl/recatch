import * as React from 'react';
import FlatButton from 'material-ui/FlatButton';
import ContentAddIcon from 'material-ui/svg-icons/content/add';
import RefreshIcon from 'material-ui/svg-icons/action/cached';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import TabbarTitle from '../../../components/tabbarTitle/TabbarTitle';
import { postSelector } from '../selectors';
import StoreState from '../../../store/types';
import PostItem, { PostModel } from './PostItem';
import { fetchPosts, deletePost } from '../actions';
import './index.css';

export interface PostListProps {
    posts: Array<PostModel>;
    fetchPosts: Function;
    deletePost: Function;
    history: any;
}

function mapStateToProps(state: StoreState) {
    return {
        posts: postSelector(state)
    }
}

function mapDispatchToProps(dispatch: Function) {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        deletePost: (postId: string | number) => dispatch(deletePost(postId)),
    }
}

@(connect(mapStateToProps, mapDispatchToProps) as any)
class PostList extends React.Component<PostListProps & RouteComponentProps<any>> {

    //刷新按钮点击事件
    handleRefresh = () => {
        this.props.fetchPosts();
    }

    //新增按钮点击事件
    handleCreate = () => {
        let { history } = this.props;
        history.push('/posts/create');
    };

    //查看博客详情
    handleItemClick = (postId: string | number) => {
        let { history } = this.props;
        history.push(`/posts/${postId}`);
    };

    //编辑博客
    handleItemModify = (postId: string | number) => {
        let { history } = this.props;
        history.push(`/posts/modify/${postId}`);
    };

    //删除博客
    handleItemDelete = (postId: string | number) => {
        let { deletePost } = this.props;

        deletePost(postId);
    };

    componentDidMount() {
        let { posts, fetchPosts } = this.props;
        if (posts.length == 0) {
            fetchPosts();
        }
    }

    render() {
        let { posts } = this.props;
        let postItems = posts.map((post, index) =>
            <PostItem
                key={index}
                post={post}
                handleItemClick={() => this.handleItemClick(post.id)}
                handleItemModify={() => this.handleItemModify(post.id)}
                handleItemDelete={() => this.handleItemDelete(post.id)}
            />
        );

        return (
            <div>
                <TabbarTitle
                    title='文章列表'
                    buttons={
                        [
                            <FlatButton key='create' label="新增" onClick={this.handleCreate} icon={<ContentAddIcon />} primary={true} />,
                            <FlatButton key='refresh' label="刷新" onClick={this.handleRefresh} icon={<RefreshIcon />} primary={true} />
                        ]
                    }
                />
                <div className='PostItem-cart-wrapper'>
                    {postItems}
                </div>
            </div>
        );
    }
}

export default withRouter(PostList);