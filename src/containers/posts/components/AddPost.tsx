import * as React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { uploadCoverImg } from '../actions';
import EditPost from './EditPost';

export interface AddPostProps {
    uploadCoverImg: Function;
}

function mapDispatchToProps(dispatch: Function) {
    return {
        uploadCoverImg: (formData: any) => dispatch(uploadCoverImg(formData))
    }
}

@(connect(null, mapDispatchToProps) as any)
class AddPost extends React.Component<AddPostProps> {
    //保存按钮点击事件
    handleSubmit = (values: any) => {
        console.log(values)
    };

    //取消按钮点击事件
    handleCancel = () => {
        let { history } = this.props;
        history.push('/posts');
    };

    render() {
        let { uploadCoverImg } = this.props;
        return (
            <EditPost initData={{}} uploadCoverImg={uploadCoverImg} onSubmit={handleSubmit} onCancel={handleCancel}/>
        );
    }
}

export default withRouter(AddPost);