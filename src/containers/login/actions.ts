import { createAsyncAction } from '../../utils/createAction';
import {LOGIN_SUCCESS, VALIDATE_SUCCESS} from './constants';
import request from '../../utils/request';
import {locationRedirect} from '../../utils/historyManage';

export const validateUsername = createAsyncAction({
    callApi: (loginInfo: any)=> request('/api/login/validate-username', {
        method: 'post',
        body: JSON.stringify(loginInfo)
    }),
    types: [,VALIDATE_SUCCESS,]
});

//登录处理 action 函数
export const doLogin = createAsyncAction({
    callApi: (loginInfo: any)=> request('/api/login', {
        method: 'post',
        body: JSON.stringify(loginInfo)
    }),
    types: [,LOGIN_SUCCESS,],
    callbacks: {
        success: (userInfo: any)=> {
            sessionStorage.setItem('user', userInfo);
            locationRedirect('/');
        }
    }
});

