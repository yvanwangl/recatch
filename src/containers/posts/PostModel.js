//import { Action } from '../utils/createAction';
import { Model, attr, many } from 'redux-orm';
import { FETCH_POST_SUCCESS } from './constants';

// export class Post extends Model {
//     // static get fields() {
//     //     return {
//     //         id: attr(),
//     //         author: attr(),
//     //         content: attr(),
//     //         //publishDate: attr(),
//     //         //views: attr(),
//     //         //comments: many("Comment", "posts")
//     //     };
//     // }

//     static reducer(action, Post, session) {
//         const { type, payload: posts } = action;
//         switch (type) {
//             case FETCH_POST_SUCCESS:
//                 posts.map((post) => {
//                     Post.create(post);
//                 });
//                 break;
//         }
//     }
// }

export class Post extends Model {
    static reducer(action, Post) {
        const { type, payload: posts } = action;
        switch (type) {
            case FETCH_POST_SUCCESS:
                posts.map((post) => {
                    Post.create(post);
                });
                break;
        }
    }
}

Post.modelName = 'Post';

Post.fields = {
    id: attr(),
    author: attr(),
    content: attr()
};
