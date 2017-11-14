import * as React from 'react';
//import AppBar from 'material-ui/AppBar';
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
                <div style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <h2 style={{margin: 0, padding: 15, fontWeight: 'normal', fontSize: 24}}>Posts List</h2>
                    <div>
                        <FlatButton />
                    </div>
                </div>
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