import * as React from 'react';
import FlatButton from 'material-ui/FlatButton';
import ContentAddIcon from 'material-ui/svg-icons/content/add';
import RefreshIcon from 'material-ui/svg-icons/action/cached';
import { connect } from 'react-redux';
import { postSelector } from '../selectors';
import StoreState from '../../../store/types';
import PostItem, { PostModel } from './PostItem';
import { fetchPosts } from '../actions';
import './index.css';

export interface PostListProps {
    posts: Array<PostModel>;
    fetchPosts: Function;
}

class PostList extends React.Component<PostListProps> {

    handleRefresh = () => {
        this.props.fetchPosts();
    }

    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        let { posts } = this.props;
        let postItems = posts.map((post, index) => <PostItem key={index} post={post} />);
        return (
            <div>
                <div className='PostList-tabbar'>
                    <h2 className='PostList-title'>Posts List</h2>
                    <div>
                        <FlatButton label="Create" icon={<ContentAddIcon />} primary={true} />
                        <FlatButton label="Refresh" onClick={this.handleRefresh} icon={<RefreshIcon />} primary={true} />
                    </div>
                </div>
                {postItems}
            </div>
        );
    }
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

function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PostList) as any;