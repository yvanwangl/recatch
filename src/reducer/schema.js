import {ORM} from 'redux-orm';
import {Post} from '../posts/index';
import {Comment} from '../comments/index';

const schema = new ORM();
schema.register(Post, Comment);

export default schema;