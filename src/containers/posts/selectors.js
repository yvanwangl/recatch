import orm from '../../reducer/orm';
import { createSelector } from 'reselect';
import { createSelector as ormCreateSelector } from 'redux-orm';

export const ormSelector = state => state.orm;

export const posts = createSelector(
    ormSelector,
    ormCreateSelector(orm, (session) => {
        return session.Post.all().toModelArray().map(post => {
            let comments = post.comments.toRefArray().map(comment => comment.content);
            return Object.assign({}, post.ref, { comments });
        })
    })
);