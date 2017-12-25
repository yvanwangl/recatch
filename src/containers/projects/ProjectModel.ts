import { Model, attr } from 'redux-orm';
import { FETCH_PROJECT_SUCCESS, ADD_PROJECT_SUCCESS, MODIFY_PROJECT_SUCCESS, DELETE_PROJECT_SUCCESS } from './constants';

export interface ProjectProps {
    id: string | number;
    name: string;
    link: string;
    description: string;
}

class Project extends Model<ProjectProps> {

    static modelName = 'Project';

    static fields = {
        id: attr(),
        name: attr(),
        link: attr(),
        description: attr()
    };

    static reducer(action: any, Project: any) {
        let { type, payload } = action;
        switch (type) {
            case FETCH_PROJECT_SUCCESS:
                payload.map((project: any) => Project.upsert({ id: project['_id'], ...project }));
                break;
            case ADD_PROJECT_SUCCESS:
            case MODIFY_PROJECT_SUCCESS:
                Project.upsert({ id: payload['_id'], ...payload });
                break;
            case DELETE_PROJECT_SUCCESS:
                Project.withId(payload['_id']).delete();
                break;
        }
    }
}

export default Project;