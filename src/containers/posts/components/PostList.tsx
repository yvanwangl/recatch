import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { postSelector } from '../selectors';
import StoreState from '../../../store/types';
import PostItem from './PostItem';
import { fetchPosts } from '../actions';

export interface PostListProps {
    posts: Array<object>;
    fetchPosts: Function;
}

class PostList extends React.Component<PostListProps> {

    componentWillMount() {
        this.props.fetchPosts();
    }

    render() {
        let { posts } = this.props;
        let postItems = posts.map((post, index) => <PostItem key={index} post={post} />);
        return (
            <div>
                <AppBar
                    title={<span>Title</span>}
                    iconElementLeft={<span></span>}
                    iconElementRight={<FlatButton label="Save" />}
                />
                {postItems}
                posts
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