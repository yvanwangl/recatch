import {Model, attr, many} from 'redux-orm';
import {ADD_COMMENT} from './constants';

// class Comment extends Model {
//     // static get fields() {
//     //     return {
//     //         id: attr(),
//     //         content: attr()
//     //     };
//     // }

//     static reducer(action, Comment){
//         let {type, payload} = action;
//         switch(type){
//             case ADD_COMMENT:
//                 Comment.create(payload);
//             break;
//         }
//     }
// }

export class Comment extends Model {
    static reducer(action, Comment) {
        let {type, payload} = action;
        switch(type){
            case ADD_COMMENT:
                Comment.create(payload);
            break;
        }
    }
}

Comment.fields = {
    id: attr(),
    content: attr()
};

Comment.modelName = 'Comment';