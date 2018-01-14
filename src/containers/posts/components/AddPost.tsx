import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import StoreState from '../../../store/types';
import { labelSelector } from '../selectors';
import { uploadCoverImg, addPost } from '../actions';
import EditPost from './EditPost';

export interface AddPostProps {
    uploadCoverImg: Function;
    addPost: Function;
    history: any;
    allLabels: any;
}

export interface AddPostState {
    openSnackbar: boolean;
}

function mapStateToProps(state: StoreState) {
    return {
        allLabels: labelSelector(state)
    }
}

function mapDispatchToProps(dispatch: Function) {
    return {
        uploadCoverImg: (formData: any) => dispatch(uploadCoverImg(formData)),
        addPost: (post: object) => dispatch(addPost(post))
    }
}

@(connect(mapStateToProps, mapDispatchToProps) as any)
class AddPost extends React.Component<AddPostProps & RouteComponentProps<any>, AddPostState> {

    constructor(props: AddPostProps & RouteComponentProps<any>) {
        super(props);
        this.state = {
            openSnackbar: false
        };
    }

    //取消按钮点击事件
    handleCancel = () => {
        let { history } = this.props;
        history.push('/posts');
    };

    render() {
        let { uploadCoverImg, allLabels, addPost } = this.props;
        return (
            <EditPost
                editTitle='新增文章'
                allLabels={allLabels}
                uploadCoverImg={uploadCoverImg}
                onSubmit={addPost}
                onCancel={this.handleCancel}
                initialValues={{
                    postStatus: true,
                    updateDate: true
                }}
            />
        );
    }
}

export default withRouter(AddPost);