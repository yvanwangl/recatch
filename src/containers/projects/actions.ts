import { createAsyncAction } from '../../utils/createAction';
import { FETCH_PROJECT_SUCCESS, ADD_PROJECT_SUCCESS, MODIFY_PROJECT_SUCCESS, DELETE_PROJECT_SUCCESS } from './constants';
import request from '../../utils/request';

//加载当前用户的所有项目
export const fetchAllProjects = createAsyncAction({
    callApi: () => request('/api/projects/get-by-user'),
    types: [, FETCH_PROJECT_SUCCESS, ]
});

//增加项目
export const addProject = createAsyncAction({
    callApi: (project: any) => request('/api/projects', {
        method: 'post',
        body: JSON.stringify(project)
    }),
    types: [, ADD_PROJECT_SUCCESS, ]
});

//修改项目
export const modifyProject = createAsyncAction({
    callApi: (project: any) => request(`/api/projects/${project.id}`, {
        method: 'put',
        body: JSON.stringify(project)
    }),
    types: [, MODIFY_PROJECT_SUCCESS, ]
});


//删除项目
export const deleteProject = createAsyncAction({
    callApi: (id: any) => request(`/api/projects/${id}`, {
        method: 'delete'
    }),
    types: [, DELETE_PROJECT_SUCCESS, ]
});