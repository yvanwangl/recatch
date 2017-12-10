import * as React from 'react';
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';
// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { postSelector } from '../selectors';
import StoreState from '../../../store/types';
import { PostModel } from './PostItem';
import TabbarTitle from '../../../components/tabbarTitle/TabbarTitle';
import FlatButton from 'material-ui/FlatButton';
import ListIcon from 'material-ui/svg-icons/action/list';

export interface PostViewProps {
    posts: Array<PostModel>;
    match: any;
    history: any
};


function mapStateToProps(state: StoreState, props: any) {
    return {
        posts: postSelector(state)
    }
}

@(connect(mapStateToProps) as any)
class PostView extends React.Component<PostViewProps> {
    constructor(props: any) {
        super(props);
    }

    config = {
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

    render() {
        let { posts, match } = this.props;
        let post = posts.filter(post => post.id == match.params.postId)[0] || { content: '' };

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
                <div className='PostView-content'>
                    <h1 className='PostView-title'>{post.title}</h1>
                    {
                        post.labels.map(label => <span>{label.name}</span>)
                    }
                    <FroalaEditor
                        tag='textarea'
                        config={this.config}
                        model={post.content}
                    />
                </div>

            </div>

        );
    }
}

export default withRouter(PostView);
