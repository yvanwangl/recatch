import { createAsyncAction } from '../../utils/createAction';
import { FETCH_LABEL_SUCCESS, ADD_LABEL_SUCCESS, MODIFY_LABEL_SUCCESS, DELETE_LABEL_SUCCESS } from './constants';
import request from '../../utils/request';

//加载当前用户的所有标签
export const fetchAllLabels = createAsyncAction({
    callApi: () => request('/api/labels/get-by-user'),
    types: [, FETCH_LABEL_SUCCESS, ]
});

//增加标签
export const addLabel = createAsyncAction({
    callApi: (label: any) => request('/api/labels', {
        method: 'post',
        body: JSON.stringify(label)
    }),
    types: [, ADD_LABEL_SUCCESS, ]
});

//修改标签
export const modifyLabel = createAsyncAction({
    callApi: (label: any) => request('/api/labels', {
        method: 'put',
        body: JSON.stringify(label)
    }),
    types: [, MODIFY_LABEL_SUCCESS, ]
});


//删除标签
export const deleteLabel = createAsyncAction({
    callApi: (id: any) => request(`/api/labels/${id}`, {
        method: 'delete'
    }),
    types: [, DELETE_LABEL_SUCCESS, ]
});
