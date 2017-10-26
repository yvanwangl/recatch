import { Action } from './createAction';

export default function createReducer(initialState: any, actionMap: object) {
    return (state: any, action: Action) => {
        if (actionMap.hasOwnProperty(action.type)) {
            return actionMap[action.type](state, action);
        } else {
            return state;
        }
    };
}