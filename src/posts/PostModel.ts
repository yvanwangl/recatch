import { Action } from '../utils/createAction';
import { Model, attr, many } from 'redux-orm';
import { FETCH_POST_SUCCESS } from './constants';

export class PostModel extends Model {
    static get fields() {
        return {
            id: attr(),
            comments: many("Comment", "posts")
        };
    }

    static reducer(action: Action, PostModel: Model, session:any) {
        const { type, payload } = action;
        switch (type) {
            case FETCH_POST_SUCCESS:
                payload.posts.map((post: object) => {
                    PostModel.create(post);
                });
                break;


        }
    }
}