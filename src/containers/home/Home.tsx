import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import {PostList} from '../posts/index';

class Home extends React.Component {
    render(){
        return (
            <div>
                <AppBar 
                    title="Title"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <PostList />
                ssdfd
            </div>
        );
    }
}

export default Home;