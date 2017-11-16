import * as React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export interface AuthorModel {
  name: string;
  avatar?: string;
}
export interface PostModel {
  id: number | string;
  title: string;
  author: AuthorModel;
  plaintext: string;
  content?: string;
  count?: string;
  publishDate?: string;
  coverImg: string;
}

export interface PostItemProps {
  key: string | number;
  post: PostModel
}
class PostItem extends React.Component<PostItemProps, object> {
  render() {
    let { author: { name, avatar }, content, count: views, publishDate, coverImg } = this.props.post;
    return (
      <Card>
        <CardHeader
          title={name}
          subtitle={views}
          avatar={avatar}
        />
        <CardMedia
          overlay={<CardTitle title={publishDate} subtitle="Overlay subtitle" />}
        >
          <img src={coverImg} alt="" />
        </CardMedia>
        <CardTitle title="Card title" subtitle="Card subtitle" />
        <CardText>
          {content}
        </CardText>
        <CardActions>
          <FlatButton label="Action1" />
          <FlatButton label="Action2" />
        </CardActions>
      </Card>
    );
  }
}

export default PostItem;