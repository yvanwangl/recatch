import * as React from 'react';
import Paper from 'material-ui/Paper';
import { Route, Switch } from 'react-router-dom';
import PostList from './PostList';
import AddPost from './AddPost';
import ModifyPost from './ModifyPost';
import PostView from './PostView';

class PostManage extends React.Component {
    render() {
        return (
            <Paper className='Manage-container'>
                <Switch>
                    <Route exact path="/posts" component={PostList} />
                    <Route exact path="/posts/create" component={AddPost} />
                    <Route exact path="/posts/modify/:postId" component={ModifyPost} />
                    <Route exact path="/posts/:postId" component={PostView} />
                </Switch>
            </Paper>
        );
    }
}

export default PostManage;