import {Model, attr} from 'redux-orm';
import {ADD_COMMENT} from './constants';

export interface CommentProps {
    id: string | number;
    content: string;
}

class Comment extends Model<CommentProps> {

    static modelName = 'Comment';

    static fields= {
        id: attr(),
        content: attr()
    };

    static reducer(action:any, Comment:any){
        let {type, payload} = action;
        switch(type){
            case ADD_COMMENT:
                Comment.create(payload);
            break;
        }
    }
}

export default Comment;