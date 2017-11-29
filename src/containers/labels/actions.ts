import { createAsyncAction } from '../../utils/createAction';
import { FETCH_LABEL_SUCCESS } from './constants';
import request from '../../utils/request';

//加载当前用户的所有标签
export const fetchAllLabels = createAsyncAction({
    callApi: () => request('/api/labels/get-by-user'),
    types: [, FETCH_LABEL_SUCCESS, ]
});