import {Model, attr, many} from 'redux-orm';
import {ADD_COMMENT} from './constants';

class Comment extends Model {
    static get fields() {
        return {
            id: attr(),
            content: attr()
        };
    }

    static reducer(action, Comment, session){
        let {type, payload} = action;
        switch(type){
            case ADD_COMMENT:
                Comment.create(payload);
            break;
        }
    }
}

Comment.modelName = 'Comment';

export default Comment;