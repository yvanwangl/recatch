import {ORM} from 'redux-orm';
import User from '../containers/login/UserModel';
import Post from '../containers/posts/PostModel';
import Comment from '../containers/comments/CommentModel';
import Label from '../containers/labels/LabelModel';
import Project from '../containers/projects/ProjectModel';
import Link from '../containers/links/LinkModel';
import Info from '../containers/info/InfoModel';
import UserList from '../containers/users/UserListModel';

export const orm = new ORM();
orm.register(User, Post, Comment, Label, Project, Link, Info, UserList);

export default orm;