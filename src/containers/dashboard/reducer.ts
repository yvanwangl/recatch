import { Action } from '../../utils/createAction';
import createReducer from '../../utils/createReducer';
import { FETCH_STATISTICS_SUCCESS } from './constants';

const dashboardReducer = createReducer({}, {
    [FETCH_STATISTICS_SUCCESS]: (state: any, { payload }: Action) => {
        return { ...state, ...payload };
    }
});

export default dashboardReducer;