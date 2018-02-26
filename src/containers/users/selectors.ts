import orm from '../../reducer/orm';
import { createSelector } from 'reselect';
import { createSelector as ormCreateSelector } from 'redux-orm';
import StoreState from '../../store/types';

export const ormSelector = (state: StoreState) => state.orm;

export const userListSelector = createSelector(
    ormSelector,
    ormCreateSelector(orm, (session) => {
        return session.UserList.all().toModelArray().map(user => Object.assign({}, user.ref));
    })
);