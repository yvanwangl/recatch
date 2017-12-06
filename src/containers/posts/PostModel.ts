import { Model, attr } from 'redux-orm';
import { FETCH_POST_SUCCESS, ADD_POST_SUCCESS, MODIFY_POST_SUCCESS, DELETE_POST_SUCCESS } from './constants';

export interface PostProps {
    id: number | string,
    title: string,
    author: object,
    plaintext: string,
    content: string,
    publishDate: string,
    blogStatus: string,
    count: number | string,
    type: string,
    updateDate: string,
    coverImg: string,
    comments: Array<object>
}

class Post extends Model<PostProps> {

    static modelName = 'Post';

    static fields = {
        id: attr(),
        title: attr(),
        userId: attr(),
        userName: attr(),
        plaintext: attr(),
        content: attr(),
        publishDate: attr(),
        postStatus: attr(),
        count: attr(),
        coverImg: attr(),
        labels: attr(),
        comments: attr(),
    };

    static reducer(action: any, Post: any) {
        const { type, payload } = action;
        switch (type) {
            case FETCH_POST_SUCCESS:
                payload.map((post: PostProps) => {
                    Post.upsert({ id: post['_id'], ...post });
                });
                break;
            case ADD_POST_SUCCESS:
            case MODIFY_POST_SUCCESS:
                Post.upsert({ id: payload['_id'], ...payload });
                break;
            case DELETE_POST_SUCCESS:
                Post.withId(payload['_id']).delete();
                break;
        }
    }
}

export default Post;