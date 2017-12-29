import * as React from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import StoreState from '../../../store/types';
import { fetchAllProjects, addProject, modifyProject } from '../actions';
import { projectSelector } from '../selectors';
import TabbarTitle from '../../../components/tabbarTitle/TabbarTitle';
import FlatButton from 'material-ui/FlatButton';
import ContentAddIcon from 'material-ui/svg-icons/content/add';
import ProjectItem from './ProjectItem';
import ProjectForm from './ProjectForm';

export interface ProjectManageProps {
    fetchAllProjects: Function;
    addProject: Function;
    modifyProject: Function;
    projects: any;
}

export interface ProjectManageState {
    openDialog: boolean;
    actionType: string;
    initialValues: object;
}

function mapStateToProps(state: StoreState) {
    return {
        projects: projectSelector(state)
    }
}

function mapDispatchToProps(dispatch: Function) {
    return {
        fetchAllProjects: () => dispatch(fetchAllProjects()),
        addProject: (project: any) => dispatch(addProject(project)),
        modifyProject: (project: any) => dispatch(modifyProject(project)),
    }
}

@(connect(mapStateToProps, mapDispatchToProps) as any)
class LabelManage extends React.Component<ProjectManageProps, ProjectManageState> {

    constructor(props: ProjectManageProps) {
        super(props);
        this.state = {
            openDialog: false,
            actionType: 'create',
            initialValues: {}
        };
    }

    //新增按钮点击事件
    handleCreate = () => {
        this.setState({
            actionType: 'create',
            openDialog: true,
            initialValues: {}
        });
    };

    //取消按钮点击事件
    handleCancel = () => {
        this.setState({
            openDialog: false
        });
    };

    //修改按钮点击事件
    handleModify = (project: any) => () => {
        this.setState({
            actionType: 'modify',
            openDialog: true,
            initialValues: project
        });
    };

    componentDidMount() {
        let { projects, fetchAllProjects } = this.props;
        if (projects.length == 0) {
            fetchAllProjects();
        }
    }

    render() {
        let { projects, addProject, modifyProject } = this.props;
        let { openDialog, actionType, initialValues } = this.state;
        let projectItems = projects.map((project: any) =>
            <ProjectItem
                key={project.id}
                project={project}
                editProject={this.handleModify(project)}
            />);
        return (
            <Paper className='Manage-container'>
                <TabbarTitle
                    title='项目管理'
                    buttons={
                        [
                            <FlatButton key='create' label="新增" onClick={this.handleCreate} icon={<ContentAddIcon />} primary={true} />
                        ]
                    }
                />
                <div className='ProjectManage-item-wrapper'>
                    {projectItems}
                </div>
                {
                    openDialog ?
                        <ProjectForm
                            type={actionType}
                            onFormSubmit={actionType == 'create' ? addProject : modifyProject}
                            openDialog={openDialog}
                            handleCancel={this.handleCancel}
                            initialValues={initialValues}
                        />
                        :
                        null
                }
            </Paper>
        );
    }
}

export default LabelManage;