//import { Action } from '../utils/createAction';
import { Model, attr, many } from 'redux-orm';
import { FETCH_POST_SUCCESS } from './constants';

class Post extends Model {
    static get fields() {
        return {
            id: attr(),
            comments: many("Comment", "posts")
        };
    }

    static reducer(action, Post, session) {
        const { type, payload } = action;
        switch (type) {
            case FETCH_POST_SUCCESS:
                payload.posts.map((post) => {
                    Post.create(post);
                });
                break;
        }
    }
}

Post.modelName = "Post";

export default Post;