import * as React from 'react';
import EditPost from '../editPost';

class AddPost extends React.Component {
    render(){
        return (
            <EditPost initData={{}} onSubmit={(values: any)=> console.log(values)}/>
        );
    }
}

export default AddPost;