import { createAsyncAction } from '../../utils/createAction';
import { FETCH_COMMENT_SUCCESS, DELETE_COMMENT_SUCCESS } from './constants';
import request from '../../utils/request';

//加载所有评论
export const fetchComments = createAsyncAction({
    callApi: () => request('/api/comments/get-by-user'),
    types: [, FETCH_COMMENT_SUCCESS,]
});

//删除评论
export const deleteComment = createAsyncAction({
    callApi: (commentId: string) => request(`/api/comments/${commentId}`, {
        method: 'delete'
    }),
    types: [, DELETE_COMMENT_SUCCESS, ]
});

