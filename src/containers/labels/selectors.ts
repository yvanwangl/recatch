import orm from '../../reducer/orm';
import { createSelector } from 'reselect';
import { createSelector as ormCreateSelector } from 'redux-orm';
import StoreState from '../../store/types';

export const ormSelector = (state: StoreState) => state.orm;

export const labelSelector = createSelector(
    ormSelector,
    ormCreateSelector(orm, (session) => {
        return session.Label.all().toModelArray().map(label => Object.assign({}, label.ref));
    })
);