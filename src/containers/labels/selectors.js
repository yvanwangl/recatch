import orm from '../../reducer/orm';
import { createSelector } from 'reselect';
import { createSelector as ormCreateSelector } from 'redux-orm';

export const ormSelector = state => state.orm;

export const labelSelector = createSelector(
    ormSelector,
    ormCreateSelector(orm, (session) => {
        return session.Label.all().toModelArray().map(label => {
            return Object.assign({}, label.ref);
        })
    })
);