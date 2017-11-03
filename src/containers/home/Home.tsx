import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import PostList from '../posts/components/PostList';

class Home extends React.Component {
    render() {
        let {pathname} = this.props;
        return (
            <div>
                <AppBar
                    title="Title"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <PostList pathname={pathname} />
                ssdfd
            </div>
        );
    }
}

export default Home;