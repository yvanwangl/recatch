import { Action } from '../utils/createAction';
import createReducer from '../utils/createReducer';
import {INCREMENT_ENTHUSIASM} from '../constants/index';

const hello = createReducer(1, {
    [INCREMENT_ENTHUSIASM]: (state: any, action: Action) => {
        let count = state.count;
        return {...state, count: count++};
    }
});

export default hello;