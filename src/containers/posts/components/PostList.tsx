import * as React from 'react';
import FlatButton from 'material-ui/FlatButton';
import ContentAddIcon from 'material-ui/svg-icons/content/add';
import RefreshIcon from 'material-ui/svg-icons/action/cached';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import TabbarTitle from '../../../components/tabbarTitle/TabbarTitle';
import { postSelector } from '../selectors';
import { labelSelector } from '../../labels/selectors';
import StoreState from '../../../store/types';
import PostItem, { PostModel } from './PostItem';
import { fetchPosts } from '../actions';
import { fetchAllLabels } from '../../labels/actions';
import './index.css';

export interface PostListProps {
    posts: Array<PostModel>;
    labels: any;
    fetchPosts: Function;
    fetchAllLabels: Function;
    history: any;
}

function mapStateToProps(state: StoreState) {
    return {
        posts: postSelector(state),
        labels: labelSelector(state)
    }
}

function mapDispatchToProps(dispatch: Function) {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        fetchAllLabels: () => dispatch(fetchAllLabels())
    }
}

@(connect(mapStateToProps, mapDispatchToProps) as any)
class PostList extends React.Component<PostListProps> {

    //刷新按钮点击事件
    handleRefresh = () => {
        this.props.fetchPosts();
    }

    //新增按钮点击事件
    handleCreate = () => {
        let {history} = this.props;
        history.push('/posts/create');
    };

    componentDidMount() {
        let {labels, fetchPosts, fetchAllLabels} = this.props;
        fetchPosts();
        if (labels.length == 0) {
            fetchAllLabels()
        }
    }

    render() {
        let { posts } = this.props;
        let postItems = posts.map((post, index) => <PostItem key={index} post={post} />);
        return (
            <div>
                <TabbarTitle 
                    title = '文章列表'
                    buttons = {
                        [
                            <FlatButton key='create' label="新增" onClick={this.handleCreate} icon={<ContentAddIcon />} primary={true} />,
                            <FlatButton key='refresh' label="刷新" onClick={this.handleRefresh} icon={<RefreshIcon />} primary={true} />
                        ]
                    }
                />
                {postItems}
            </div>
        );
    }
}

export default withRouter(PostList);