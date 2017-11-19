//sync action creator
export interface Action {
    type: string;
    payload?: any
}

export function createAction(actionName: string): Function {
    return (payload: any): Action => {
        return {
            type: actionName,
            payload
        }
    }
}

/**
 * aync action creator
 * @callApi: 异步请求方法，接受参数 params
 * @types: 发起请求，请求成功，请求失败 的 actionTypes
 * @callbacks: 请求成功或失败的回调 用于处理有副作用的动作，例如路由跳转、sessionStorage 存储等
 */
export interface AsyncData {
    callApi: any;
    types: Array<string|undefined>;
    callbacks?: {success?: Function, fail?: Function};
}

export function createAsyncAction(asyncData: AsyncData): Function {
    const { callApi, types: [requestType, successType, failType], callbacks } = asyncData;
    return (params?: any): Function => {
        /**
         * return function action, to dispatch for redux-thunk
         */
        return (dispatch: any) => {
            dispatch({
                type: requestType || "REQUEST"
            });
            return callApi(params)
                .then((jsonData: any) => {
                    if(jsonData.success) {
                        callbacks && callbacks.success && callbacks.success(jsonData.data);
                        dispatch({
                            type: successType,
                            payload: jsonData
                        });
                    }
                    return jsonData;
                })
                .catch((error: any) => {
                    console.log(error);
                    callbacks && callbacks.fail && callbacks.fail(error);
                    dispatch({
                        type: failType || "FAIL",
                        payload: error
                    });
                })
        }
    }
}