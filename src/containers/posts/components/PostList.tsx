import * as React from 'react';
import { connect } from 'react-redux';
import { posts } from '../selectors';
import StoreState from '../../../store/types';
import PostItem from './PostItem';

export interface PostListProps {
    posts: Array<object>
}

class PostList extends React.Component<PostListProps, object> {

    render() {
        let { posts } = this.props;
        let postItems = posts.map((post, index) => {
            <PostItem key={index} post={post} />
        })
        return (
            <div>
                {postItems}
            </div>
        );
    }
}

function mapStateToProps(state: StoreState) {
    return {
        posts: posts(state)
    }
}

export default connect(mapStateToProps)(PostList);