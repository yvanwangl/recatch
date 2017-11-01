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

// aync action creator
export interface AsyncData {
    callApi: any;
    types: Array<string>;
}

export function createAsyncAction(asyncData: AsyncData): Function {
    const { callApi, types: [requestType, successType, failType] } = asyncData;
    return (params: any): Function => {
        /**
         * return function action, to dispatch for redux-thunk
         */
        return (dispatch: any) => {
            dispatch({
                type: requestType || "REQUEST"
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
                    console.log(error);
                    dispatch({
                        type: failType || "FAIL",
                        payload: error
                    });
                })
        }
    }
}