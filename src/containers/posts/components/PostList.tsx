import * as React from 'react';
import FlatButton from 'material-ui/FlatButton';
import ContentAddIcon from 'material-ui/svg-icons/content/add';
import RefreshIcon from 'material-ui/svg-icons/action/cached';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import TabbarTitle from '../../../components/tabbarTitle/TabbarTitle';
import { postSelector } from '../selectors';
import StoreState from '../../../store/types';
import PostItem, { PostModel } from './PostItem';
import { fetchPosts } from '../actions';
import './index.css';

export interface PostListProps {
    posts: Array<PostModel>;
    fetchPosts: Function;
    history: any;
}

function mapStateToProps(state: StoreState) {
    return {
        posts: postSelector(state)
    }
}

function mapDispatchToProps(dispatch: Function) {
    return {
        fetchPosts: () => dispatch(fetchPosts())
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
        this.props.fetchPosts();
    }

    render() {
        let { posts } = this.props;
        let postItems = posts.map((post, index) => <PostItem key={index} post={post} />);
        return (
            <div>
                <TabbarTitle 
                    title = 'Posts List'
                    buttons = {
                        [
                            <FlatButton label="Create" onClick={this.handleCreate} icon={<ContentAddIcon />} primary={true} />,
                            <FlatButton label="Refresh" onClick={this.handleRefresh} icon={<RefreshIcon />} primary={true} />
                        ]
                    }
                />
                {postItems}
            </div>
        );
    }
}

export default withRouter(PostList);