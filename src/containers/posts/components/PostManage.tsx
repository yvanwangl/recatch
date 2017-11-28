import * as React from 'react';
import { Route } from 'react-router-dom';
import PostList from './PostList';
import AddPost from './AddPost';

class PostManage extends React.Component {
    render(){
        return (
            <div>
                <Route exact path="/posts" component={PostList} />
                <Route exact path="/posts/create" component={AddPost} />
            </div>
        );
    }
}

export default PostManage;