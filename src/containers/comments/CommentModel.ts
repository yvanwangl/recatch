import { Model, attr } from 'redux-orm';
import { FETCH_COMMENT_SUCCESS, ADD_COMMENT_SUCCESS, DELETE_COMMENT_SUCCESS } from './constants';

export interface CommentProps {
    id: string;
    parentId: string;
    postId: string;
    name: string;
    commentTime: string;
    commentContent: string;
    agree: number;
    disagree: number;
}

class Comment extends Model<CommentProps> {

    static modelName = 'Comment';

    static fields = {
        id: attr(),
        parentId: attr(),
        postId: attr(),
        name: attr(),
        commentTime: attr(),
        commentContent: attr(),
        agree: attr(),
        disagree: attr()
    };

    static reducer(action: any, Comment: any) {
        let { type, payload } = action;
        switch (type) {
            case FETCH_COMMENT_SUCCESS:
                payload.map((comment: CommentProps) => {
                    Comment.upsert({ id: comment['_id'], ...comment });
                });
                break;
            case ADD_COMMENT_SUCCESS:
                Comment.upsert({ id: payload['_id'], ...payload})
            case DELETE_COMMENT_SUCCESS:
                Comment.withId(payload['_id']).delete();
                break;
        }
    }
}

export default Comment;