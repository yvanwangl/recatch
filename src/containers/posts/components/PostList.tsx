import * as React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { postSelector } from '../selectors';
import StoreState from '../../../store/types';
import PostItem from './PostItem';
import {fetchPosts} from '../actions';

export interface PostListProps {
    pathname: string;
    posts: Array<object>
}

class PostList extends React.Component<PostListProps, object> {
    static fetchData(){

    }

    componentWillMount(){
        let {pathname} = this.props;
        if(pathname == '/') {
            this.fetchData();
        }
    }

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
        posts: postSelector(state)
    }
}

function mapDispatchToProps(dispatch){
    return {
        fetchPosts: bindActionCreators(fetchPosts, dispatch)
    }
}

export default connect(mapStateToProps)(PostList);