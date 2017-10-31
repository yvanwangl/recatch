//sync action creator
export interface Action {
    type: string;
    payload?: any
}

export function createAction(actionName: string) {
    return (payload: any): Action => {
        return {
            type: actionName,
            payload
        }
    }
}

// aync action creator
export interface AsyncData {
    callApi: any;
    types: Array<string>;
}

export function createAsyncAction(asyncData: AsyncData) {
    const { callApi, types: [requestType, successType, failType] } = asyncData;
    return (params: any) => {
        /**
         * return function action, to dispatch for redux-thunk
         */
        return (dispatch: any) => {
            dispatch({
                type: requestType
            });
            return callApi(params)
                .then((jsonData: any) => {
                    dispatch({
                        type: successType,
                        payload: jsonData
                    });
                    return jsonData;
                })
                .catch((error: any) => {
                    dispatch({
                        type: failType,
                        payload: error
                    });
                })
        }
    }
}