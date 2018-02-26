import { createAsyncAction } from '../../utils/createAction';
import { FETCH_USER_SUCCESS, LOCK_USER_SUCCESS } from './constants';
import request from '../../utils/request';

//加载所有用户
export const fetchUserList = createAsyncAction({
    callApi: () => request('/api/users/all'),
    types: [ ,FETCH_USER_SUCCESS, ]
});

//锁定用户
export const lockUser = createAsyncAction({
    callApi: (userId: string) => request(`/api/users/user/${userId}`),
    types: [ ,LOCK_USER_SUCCESS, ]
});