import * as React from 'react';
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';
// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';
//const {httpServer} = require('../../../system.config');
import { imgUpload } from '../../../utils/request';

export interface EditorProps {
    onChange: Function;
}

export interface EditorState {
    model: any;
};

export default class Editor extends React.Component<EditorProps, EditorState> {
    constructor(props: any) {
        super(props);
        this.state = {
            model: '开始书写你的故事...'
        };
    }

    config = {
        placeholderText: 'Edit Your Content Here!',
        charCounterCount: false,
        // Set the file/image upload URL. 根据 imageUploadParam: FroalaImg 来判断返回不同的数据对象。
        imageUploadParam: 'FroalaImg',
        imageUploadURL: imgUpload,
        fileUploadURL: imgUpload
    };

    handleModelChange = (model: any) => {
        let { onChange } = this.props;
        this.setState({
            model
        });
        onChange(model);
    };

    render() {
        return (
            <FroalaEditor
                tag='textarea'
                config={this.config}
                model={this.state.model}
                onModelChange={this.handleModelChange}
            />
        );
    }
}