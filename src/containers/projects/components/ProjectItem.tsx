import * as React from 'react';

export interface ProjectItemProps {
    project: any;
}

const ProjectItem = ({project}: ProjectItemProps)=> {
    let {name, link, description} = project;
    return (
        <div>
            <span>{name}</span>
            <span>{link}</span>
            <span>{description}</span>
        </div>
    );
};

export default ProjectItem;