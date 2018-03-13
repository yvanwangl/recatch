import { combineReducers } from 'redux';
import dashboardReducer from '../containers/dashboard/reducer';
import postReducer from '../containers/posts/reducer';

const ui = combineReducers({
    dashboard: dashboardReducer,
    postPagination: postReducer
});

export default ui;