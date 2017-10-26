export interface Action {
    type: string;
    payload?: any
}

export default function createAction(actionName: string) {
    return (payload: any): Action => {
        return {
            type: actionName,
            payload
        }
    }
}