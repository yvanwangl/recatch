import orm from '../../reducer/orm';
import { createSelector } from 'reselect';
import { createSelector as ormCreateSelector } from 'redux-orm';
import StoreState from '../../store/types';

export { labelSelector } from '../labels/selectors';

export const ormSelector = (state: StoreState) => state.orm;

export const postSelector = createSelector(
    ormSelector,
    ormCreateSelector(orm, (session) => {
        return session.Post.all().toModelArray().map(post => Object.assign({}, post.ref));
    })
);