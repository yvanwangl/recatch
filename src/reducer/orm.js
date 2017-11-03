import { ORM } from 'redux-orm';
import { PostModel as Post } from '../containers/posts/index';
import { Comment } from '../containers/comments/index';

export const orm = new ORM();
orm.register(Post, Comment);

export default orm;