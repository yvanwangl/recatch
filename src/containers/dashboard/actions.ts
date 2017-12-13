import { createAsyncAction } from '../../utils/createAction';
import { FETCH_STATISTICS_SUCCESS } from './constants';
import request from '../../utils/request';

//查询统计信息
export const fetchStatistics = createAsyncAction({
    callApi: () => request('/api/statistics'),
    types: [, FETCH_STATISTICS_SUCCESS, ],
});