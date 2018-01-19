import * as React from 'react';
import Chip from 'material-ui/Chip';
import TodayIcon from 'material-ui/svg-icons/action/today';
import VisibilityIcon from 'material-ui/svg-icons/action/visibility';
import CommentIcon from 'material-ui/svg-icons/communication/comment';
import AuthorIcon from 'material-ui/svg-icons/image/edit';
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';
// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';
//import FroalaEditor from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { postSelector } from '../selectors';
import StoreState from '../../../store/types';
import { PostModel } from './PostItem';
import TabbarTitle from '../../../components/tabbarTitle/TabbarTitle';
import FlatButton from 'material-ui/FlatButton';
import ListIcon from 'material-ui/svg-icons/action/list';
import { fetchPosts } from '../actions';
import { dateFormat } from '../../../utils/util';

export interface PostViewProps {
    posts: Array<PostModel>;
    match: any;
    history: any;
    fetchPosts: Function;
};


function mapStateToProps(state: StoreState, props: any) {
    return {
        posts: postSelector(state)
    }
}

function mapDispatchToProps(dispatch: Function) {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
    }
}

@(connect(mapStateToProps, mapDispatchToProps) as any)
class PostView extends React.Component<PostViewProps & RouteComponentProps<any>> {

    config = {
        key: 'GC-9qigB-32jbjD6lD-8I-8==',
        placeholderText: 'Edit Your Content Here!',
        charCounterCount: false,
        toolbarButtons: [],
        events: {
            'froalaEditor.initialized': function (e: any, editor: any) {
                editor.edit.off();
            }
        }
    };

    handleList = () => {
        let { history } = this.props;
        history.push('/posts');
    };

    componentDidMount(){
        let { posts, fetchPosts } = this.props;
        if (posts.length == 0) {
            fetchPosts();
        }
    }

    render() {
        let { posts, match } = this.props;
        if (posts.length == 0) {
            return null;
        }
        let {
            author,
            count,
            title,
            content,
            publishDate,
            comments,
            labels
        } = posts.filter(post => post.id == match.params.postId)[0];
        let labelItems = labels.map((label, index) => {
            return <Chip
                key={index}
                style={{ margin: 4, display: 'inline-block' }}
                backgroundColor={label.bgColor}
                labelColor={label.fontColor}>
                {label.name}
            </Chip>;
        })

        return (
            <div>
                <TabbarTitle
                    title=''
                    buttons={
                        [
                            <FlatButton
                                key='list'
                                label="列表"
                                icon={<ListIcon />}
                                primary={true}
                                onClick={this.handleList}
                            />
                        ]
                    }
                />
                <div className='PostView-content Editor-content'>
                    <h1 className='PostView-title'>{title}</h1>
                    <div className='PostView-info'>
                        <span className='PostView-card-icon-wrapper'><TodayIcon className='PostView-card-icon' /> {dateFormat(publishDate)}</span>
                        <span className='PostView-card-icon-wrapper'><AuthorIcon className='PostView-card-icon' /> {author}</span>
                        <span className='PostView-card-icon-wrapper'><VisibilityIcon className='PostView-card-icon' /> {count}</span>
                        <span className='PostView-card-icon-wrapper'><CommentIcon className='PostView-card-icon' /> {comments.length}</span>
                    </div>
                    <FroalaEditorView model={content} />
                    {labelItems}
                </div>

            </div>

        );
    }
}

export default withRouter(PostView);
