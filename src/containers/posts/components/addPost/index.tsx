import * as React from 'react';
import EditPost from '../editPost';

class AddPost extends React.Component {
    render(){
        return (
            <EditPost initData={{}} onSave={()=> console.log('save')}/>
        );
    }
}

export default AddPost;