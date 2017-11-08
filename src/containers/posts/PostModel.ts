//import { Action } from '../utils/createAction';
import { Model, attr, many } from 'redux-orm';
import { FETCH_POST_SUCCESS } from './constants';

export interface PostProps {
    id: number | string,
    author: string,
    content: string,
    publishDate: string,
    views: number | string,
    comments: Array<object>
}

class Post extends Model<PostProps> {

    static modelName = 'Post';

    static fields = {
        id: attr(),
        author: attr(),
        content: attr(),
        publishDate: attr(),
        views: attr(),
        comments: many({
            to: 'Comment',
            relatedName: 'posts'
        })
    };

    static reducer(action:any, Post:any) {
        const { type, payload: posts } = action;
        switch (type) {
            case FETCH_POST_SUCCESS:
                posts.map((post: PostProps) => {
                    Post.upsert(post);
                });
                break;
        }
    }
}

export default Post;