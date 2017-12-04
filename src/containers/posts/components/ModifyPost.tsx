import * as React from 'react';
//import Snackbar from 'material-ui/Snackbar';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import StoreState from '../../../store/types';
import { postSelector } from '../selectors';
import { labelSelector } from '../../labels/selectors';
import { uploadCoverImg, modifyPost } from '../actions';
import EditPost from './EditPost';
import { PostModel } from './PostItem';

export interface ModifyPostProps {
    uploadCoverImg: Function;
    modifyPost: Function;
    history: any;
    allLabels: any;
    posts: Array<PostModel>;
    match: any;
}

function mapStateToProps(state: StoreState) {
    return {
        allLabels: labelSelector(state),
        posts: postSelector(state)
    }
}

function mapDispatchToProps(dispatch: Function) {
    return {
        uploadCoverImg: (formData: any) => dispatch(uploadCoverImg(formData)),
        modifyPost: (post: object) => dispatch(modifyPost(post))
    }
}

@(connect(mapStateToProps, mapDispatchToProps) as any)
class ModifyPost extends React.Component<ModifyPostProps> {
    // //保存按钮点击事件
    // handleSubmit = (values: any) => {
    //     let { modifyPost } = this.props;
    //     //如果发布，则博客状态为 'Publish'
    //     values.postStatus = values.postStatus ? 'Publish' : 'Draft';

    //     //设置文章概要
    //     let fragment = document.createElement('div');
    //     fragment.innerHTML = values.content;
    //     values.plaintext = fragment.textContent ? fragment.textContent.substr(0, 200) : '';
    //     modifyPost(values);
    //     console.log(values)
    // };

    //取消按钮点击事件
    handleCancel = () => {
        let { history } = this.props;
        history.push('/posts');
    };

    render() {
        let { uploadCoverImg, allLabels, posts, match, modifyPost } = this.props;
        let post = posts.filter(post => post.id == match.params.postId)[0] || { content: '' };

        return (
            <EditPost
                editTitle='编辑文章'
                allLabels={allLabels}
                uploadCoverImg={uploadCoverImg}
                onSubmit={modifyPost}
                onCancel={this.handleCancel}
                initialValues={{
                    ...post,
                    postStatus: true,
                    updateDate: true
                }}
            />
        );
    }
}

export default withRouter(ModifyPost);