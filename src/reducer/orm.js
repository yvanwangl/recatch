import {ORM} from 'redux-orm';
import {Post} from '../containers/posts/index';
import {Comment} from '../containers/comments/index';

const orm = new ORM();
orm.register(Post, Comment);

export default orm;