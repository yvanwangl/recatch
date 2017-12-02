import * as React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import StoreState from '../../../store/types';
import { labelSelector } from '../../labels/selectors';
import { uploadCoverImg } from '../actions';
import EditPost from './EditPost';

export interface AddPostProps {
    uploadCoverImg: Function;
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
        uploadCoverImg: (formData: any) => dispatch(uploadCoverImg(formData))
    }
}

@(connect(mapStateToProps, mapDispatchToProps) as any)
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