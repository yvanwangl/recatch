import { ORM } from 'redux-orm';
import Post from '../containers/posts/PostModel';
import Comment from '../containers/comments/CommentModel';

export const orm = new ORM();
orm.register(Post, Comment);

export default orm;