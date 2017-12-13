import { combineReducers } from 'redux';
import dashboardReducer from '../containers/dashboard/reducer';

const ui = combineReducers({
    dashboard: dashboardReducer
});

export default ui;