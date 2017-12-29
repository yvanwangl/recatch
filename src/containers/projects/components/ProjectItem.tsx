import * as React from 'react';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
export interface ProjectItemProps {
    project: any;
    editProject: ()=> void;
}

const ProjectItem = ({ project, editProject }: ProjectItemProps) => {
    let { name, link, description } = project;
    return (
        <Card className='ProjectItem-card'>
            <CardHeader
                title={<h1 className='ProjectItem-card-title'>{name}</h1>}
            />
            <CardText className='ProjectItem-card-text'>
                {description}
            </CardText>
            <CardActions className='ProjectItem-card-actions'>
                <FlatButton secondary={true} label="编辑项目" onClick={editProject}/>
                <a href={link} target='_blank'><FlatButton primary={true} label="查看项目" /></a>
            </CardActions>
        </Card>
    );
};

export default ProjectItem;