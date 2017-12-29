import { createAsyncAction } from '../../utils/createAction';
import { FETCH_LINK_SUCCESS, AUDIT_LINK_SUCCESS } from './constants';
import request from '../../utils/request';

//加载当前用户的所有友链
export const fetchAllLinks = createAsyncAction({
    callApi: () => request('/api/links/get-by-user'),
    types: [, FETCH_LINK_SUCCESS, ]
});

//审核友连
export const auditLink = createAsyncAction({
    callApi: (link: any) => request(`/api/links/${link.id}`, {
        method: 'put',
        body: JSON.stringify(link)
    }),
    types: [, AUDIT_LINK_SUCCESS, ]
});