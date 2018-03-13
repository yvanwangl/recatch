import * as React from 'react';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import PrevIcon from 'material-ui/svg-icons/image/navigate-before';
import NextIcon from 'material-ui/svg-icons/image/navigate-next';
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

const { limit } = require('../../../system.config');

export interface PostListProps {
    posts: Array<PostModel>;
    totalCount: number;
    currentPage: number;
    fetchPosts: Function;
    deletePost: Function;
    history: any;
}

function mapStateToProps(state: StoreState) {
    return {
        posts: postSelector(state),
        totalCount: state.ui.postPagination.totalCount,
        currentPage: state.ui.postPagination.currentPage
    }
}

function mapDispatchToProps(dispatch: Function) {
    return {
        fetchPosts: (currentPage: number) => dispatch(fetchPosts(currentPage)),
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

    //上下页切换事件
    handlePageChange = (step: number) => {
        let { fetchPosts, currentPage } = this.props;
        fetchPosts(currentPage + step);
    };

    componentDidMount() {
        let { posts, fetchPosts, currentPage } = this.props;
        if (posts.length == 0) {
            fetchPosts(currentPage);
        }
    }

    render() {
        let { posts, totalCount, currentPage } = this.props;
        let postRemainder = posts.length % 3;
        let postFill = postRemainder == 0 ? 0 : 3 - postRemainder;
        let postItems = posts.map((post, index) =>
            <PostItem
                key={post.id}
                post={post}
                handleItemClick={() => this.handleItemClick(post.id)}
                handleItemModify={() => this.handleItemModify(post.id)}
                handleItemDelete={() => this.handleItemDelete(post.id)}
            />
        );
        let fillPostItems = new Array(postFill).fill('post').map((p, index) => <span key={`${p}-${index}`} className='PostItem-card PostItem-fill'></span>);
        const nextBtn = <FloatingActionButton className='nextPage' secondary={true} onClick={() => this.handlePageChange(1)}><NextIcon /></FloatingActionButton>;
        const prevBtn = <FloatingActionButton className='prevPage' secondary={true} onClick={() => this.handlePageChange(-1)}><PrevIcon /></FloatingActionButton>;

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
                    {fillPostItems}
                </div>
                <div className='pagination'>
                    {
                        totalCount <= limit ? null :
                            currentPage == 1 ? nextBtn :
                                currentPage == Math.ceil(totalCount / limit) ? prevBtn :
                                    <span>{prevBtn} {nextBtn}</span>
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(PostList);