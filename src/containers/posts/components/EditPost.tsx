import * as React from 'react';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ListIcon from 'material-ui/svg-icons/action/list';
import TabbarTitle from '../../../components/tabbarTitle/TabbarTitle';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { TextField, SelectField } from 'redux-form-material-ui'
import './index.css';

export interface EditPostProps {
    initData: any;
    labels: any;
    onCancel: Function;
    onSubmit: Function;
    uploadCoverImg: Function;
}

export interface EditPostState {
    coverImg: string;
    values: Array<string | number>;
}

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];


class EditPost extends React.Component<EditPostProps & InjectedFormProps, EditPostState> {

    upload: any;

    state = {
        coverImg: '',
        values: []
    };

    static validate(values: any) {
        const errors = { coverImg: '', title: '', author: '' };

        if (!values.coverImg) {
            errors.coverImg = '封面图不能为空';
        }

        if (!values.title) {
            errors.title = '文章标题不能为空';
        }

        if (!values.author) {
            errors.author = '作者不能为空';
        }

        return errors;
    }

    menuItems(values: any) {
        //let {labels} = this.props;
        return names.map((name) => (
            <MenuItem
                key={name}
                insetChildren={true}
                checked={values && values.indexOf(name) > -1}
                value={name}
                primaryText={name}
            />
        ));
    }

    handleCancel = ()=> {
        let {onCancel} = this.props;
        onCancel();
    };

    handleCoverImg = (e: any) => {
        let { uploadCoverImg } = this.props;
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append('coverImg', file);
        uploadCoverImg(formData).then((result: any) => {
            if (result.success) {
                this.setState({
                    coverImg: result.data
                });
            }
        });
    };

    handleChange = (values: any) => this.setState({values});

    componentDidMount(){

    }


    render() {
        const { handleSubmit } = this.props;
        const { coverImg, values } = this.state;
        const handleChange = this.handleChange;

        return (
            <div>
                <TabbarTitle
                    title='新增文章'
                    buttons={
                        [
                            <FlatButton key='list' label="列表" icon={<ListIcon />} primary={true} />
                        ]
                    }
                />
                <form className='EditPost-form'>
                    <div className='EditPost-form-item'>
                        <Field
                            name="coverImg"
                            component={TextField as any}
                            props={{
                                fullWidth: true,
                                hintText: '封面图',
                                floatingLabelText: '封面图',
                                disabled: true,
                                value: coverImg
                            } as any}
                        />
                        <div style={{ height: 36, marginTop: 16 }}>
                            <input id="myInput" type="file" ref={(ref) => this.upload = ref} style={{ display: 'none' }} onChange={this.handleCoverImg} />
                            <RaisedButton
                                label="封面图"
                                secondary={true}
                                onClick={(e) => this.upload.click()}
                            />
                        </div>
                    </div>
                    <div className='EditPost-form-item'>
                        <Field
                            name="title"
                            component={TextField as any}
                            props={{
                                fullWidth: true,
                                hintText: '文章标题',
                                floatingLabelText: '文章标题'
                            } as any}
                        />
                    </div>
                    <div className='EditPost-form-item'>
                        <Field
                            name="author"
                            component={TextField as any}
                            props={{
                                fullWidth: true,
                                hintText: '作者',
                                floatingLabelText: '作者'
                            } as any}
                        />
                    </div>
                    <div className='EditPost-form-item'>
                        <Field
                            name="labels"
                            component={SelectField as any}
                            props={{
                                multiple: true,
                                fullWidth: true,
                                hintText: '标签',
                                floatingLabelText: '标签',
                                value: values,
                                onChange: handleChange
                            } as any}
                        >
                            {this.menuItems(values)}
                        </Field>
                    </div>
                </form>
                <div style={{ marginTop: 12 }}>
                    <FlatButton
                        label="取消"
                        onClick={this.handleCancel}
                        style={{ marginRight: 12 }}
                    />
                    <RaisedButton
                        label="保存"
                        primary={true}
                        onClick={handleSubmit}
                    />
                </div>
            </div>

        );
    }
}

export default reduxForm({
    form: 'editPost',
    validate: EditPost.validate,
})(EditPost) as any;