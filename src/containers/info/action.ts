import { createAsyncAction } from '../../utils/createAction';
import { FETCH_USER_SUCCESS, MODIFY_EMAIL_SUCCESS } from './constants';
import request from '../../utils/request';

//加载当前登录的用户信息
export const fetchUserInfo = createAsyncAction({
    callApi: () => request('/api/users'),
    types: [, FETCH_USER_SUCCESS, ]
});


//设置用户邮箱
export const modifyEmail = createAsyncAction({
    callApi: (info: any) => request('/api/users/email', {
        method: 'post',
        body: JSON.stringify(info)
    }),
    types: [, MODIFY_EMAIL_SUCCESS, ]
});