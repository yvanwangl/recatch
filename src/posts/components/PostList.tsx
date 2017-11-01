import * as React from 'react';
import {connect} from 'react-redux';

class PostList extends React.Component {
    render(){
        return (
            <div>
                bloglist
            </div>
        );
    }
}

export default connect()(PostList);