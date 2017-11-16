import { createAsyncAction } from '../../utils/createAction';
import {LOGIN_SUCCESS} from './constants';
import request from '../../utils/request';

export const doLogin = createAsyncAction({
    callApi: (loginInfo: any)=> request('/api/login', {
        method: 'post',
        body: JSON.stringify(loginInfo)
    }),
    types: [,LOGIN_SUCCESS,]
});

