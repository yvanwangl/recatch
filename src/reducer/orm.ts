import {ORM} from 'redux-orm';
import User from '../containers/login/UserModel';
import Post from '../containers/posts/PostModel';
import Comment from '../containers/comments/CommentModel';

export const orm = new ORM();
orm.register(User, Post, Comment);

export default orm;