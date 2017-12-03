import * as React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import StoreState from '../../../store/types';
import { labelSelector } from '../../labels/selectors';
import { uploadCoverImg, addPost } from '../actions';
import EditPost from './EditPost';

export interface AddPostProps {
    uploadCoverImg: Function;
    addPost: Function;
    history: any;
    labels: any;
}

function mapStateToProps(state: StoreState) {
    return {
        labels: labelSelector(state)
    }
}

function mapDispatchToProps(dispatch: Function) {
    return {
        uploadCoverImg: (formData: any) => dispatch(uploadCoverImg(formData)),
        addPost: (post: object) => dispatch(addPost(post))
    }
}

@(connect(mapStateToProps, mapDispatchToProps) as any)
class AddPost extends React.Component<AddPostProps> {
    //保存按钮点击事件
    handleSubmit = (values: any) => {
        let { addPost } = this.props;
        //如果发布，则博客状态为 'Publish'
        if (values.postStatus) {
            values.postStatus = 'Publish';
        }
        addPost(values);
        console.log(values)
    };

    //取消按钮点击事件
    handleCancel = () => {
        let { history } = this.props;
        history.push('/posts');
    };

    render() {
        let { uploadCoverImg, labels } = this.props;
        return (
            <EditPost
                initData={{}}
                labels={labels}
                uploadCoverImg={uploadCoverImg}
                onSubmit={this.handleSubmit}
                onCancel={this.handleCancel}
            />
        );
    }
}

export default withRouter(AddPost);