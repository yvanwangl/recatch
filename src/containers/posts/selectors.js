import orm from '../../reducer/orm';
import { createSelector } from 'reselect';
import { createSelector as ormCreateSelector } from 'redux-orm';

export const ormSelector = state => state.orm;

export const postSelector = createSelector(
    ormSelector,
    ormCreateSelector(orm, (session) => {
        return session.Post.all().toModelArray().map(post => {
            let comments = post.comments.toRefArray().map(comment => comment.content);
            return Object.assign({}, post.ref, { comments });
        })
    })
);

export const allLabelsSelector = createSelector(
    ormSelector,
    ormCreateSelector(orm, (session) => {
        return session.Label.all().toModelArray().map(label => {
            return Object.assign({}, label.ref);
        })
    })
);