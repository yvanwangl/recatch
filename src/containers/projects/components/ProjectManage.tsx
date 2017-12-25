import * as React from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import StoreState from '../../../store/types';
import { fetchAllProjects, addProject, modifyProject } from '../actions';
import { projectSelector } from '../selectors';
import TabbarTitle from '../../../components/tabbarTitle/TabbarTitle';
import ProjectItem from './ProjectItem';

// const dataSource = [{
//     id: 1, name: 'React', bgColor: '#000', fontColor: '#fff', enabled: false
// }];

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


    // onChange = (row: any) => {
    //     //如果为虚拟数据，则为保存； 否则为修改
    //     let { addProject, modifyProject } = this.props;
    //     if (row.phantom) {
    //         addLabel(row);
    //     } else {
    //         modifyLabel(row);
    //     }
    // }

    // onDelete = (row: any) => {
    //     //如果为虚拟数据则不处理，否则调删除接口
    //     let { deleteLabel } = this.props;
    //     if (!row.phantom) {
    //         deleteLabel(row.id);
    //     }
    // }

    componentDidMount() {
        let { projects, fetchAllProjects } = this.props;
        if (projects.length == 0) {
            fetchAllProjects();
        }
    }

    render() {
        let { projects } = this.props;
        let projectItems = projects.map((project: any) => <ProjectItem key={project.id} project={project}/>);
        return (
            <Paper className='Manage-container'>
                <TabbarTitle title='项目管理' />
                <div style={{ padding: 30 }}>
                    {projectItems}
                </div>
            </Paper>
        );
    }
}

export default LabelManage;