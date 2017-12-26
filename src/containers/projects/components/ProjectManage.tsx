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

export interface LabelManageProps {
    fetchAllProjects: Function;
    addProject: Function;
    modifyProject: Function;
    projects: any;
}

function mapStateToProps(state: StoreState) {
    return {
        projects: projectSelector(state)
    }
}

function mapDispatchToProps(dispatch: Function) {
    return {
        fetchAllProjects: () => dispatch(fetchAllProjects()),
        addLabel: (project: any) => dispatch(addProject(project)),
        modifyLabel: (project: any) => dispatch(modifyProject(project)),
    }
}

@(connect(mapStateToProps, mapDispatchToProps) as any)
class LabelManage extends React.Component<LabelManageProps> {

    handleCreate = ()=> {};

    componentDidMount() {
        let { projects, fetchAllProjects } = this.props;
        if (projects.length == 0) {
            fetchAllProjects();
        }
    }

    render() {
        let { projects } = this.props;
        let projectItems = projects.map((project: any) => <ProjectItem key={project.id} project={project} />);
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
                <div style={{ padding: 30 }}>
                    {projectItems}
                </div>
            </Paper>
        );
    }
}

export default LabelManage;