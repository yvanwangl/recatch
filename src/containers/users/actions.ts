import { createAsyncAction } from '../../utils/createAction';
import { FETCH_USER_SUCCESS, LOCK_TOGGLE_USER_SUCCESS } from './constants';
import request from '../../utils/request';

//加载所有用户
export const fetchUserList = createAsyncAction({
    callApi: () => request('/api/users/all'),
    types: [ ,FETCH_USER_SUCCESS, ]
});

//锁定用户
export const lockToggleUser = createAsyncAction({
    callApi: (userId: string, toggleStatus: string) => {
        console.log(userId, toggleStatus);
        return request(`/api/users/user/${userId}`, {
            method: 'post',
            body: JSON.stringify({status: toggleStatus})
        })
    },
    types: [ ,LOCK_TOGGLE_USER_SUCCESS, ]
});