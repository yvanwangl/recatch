import orm from '../../reducer/orm';
import { createSelector } from 'reselect';
import { createSelector as ormCreateSelector } from 'redux-orm';
import StoreState from '../../store/types';

export const ormSelector = (state: StoreState) => state.orm;

export const linkSelector = createSelector(
    ormSelector,
    ormCreateSelector(orm, (session) => {
        return session.Link.all().toModelArray().map(link => Object.assign({}, link.ref));
    })
);