import orm from '../../reducer/orm';
import { createSelector } from 'reselect';
import { createSelector as ormCreateSelector } from 'redux-orm';
import StoreState from '../../store/types';

export { postSelector } from '../posts/selectors';

export const ormSelector = (state: StoreState) => state.orm;

export const commentSelector = createSelector(
    ormSelector,
    ormCreateSelector(orm, (session) => {
        return session.Comment.all().toModelArray().map(comment => Object.assign({}, comment.ref));
    })
);