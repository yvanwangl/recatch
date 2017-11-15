import * as React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export interface PostObj {
    author?: string;
    content?: string;
    views?: string;
    publishDate?: string;
}

export interface PostItemProps {
    post: PostObj
}
class PostItem extends React.Component<PostItemProps, object> {
    render() {
        let { author, content, views, publishDate } = this.props.post;
        return (
            <Card>
            <CardHeader
              title={author}
              subtitle={views}
              avatar="images/jsa-128.jpg"
            />
            <CardMedia
              overlay={<CardTitle title={publishDate} subtitle="Overlay subtitle" />}
            >
              <img src="images/nature-600-337.jpg" alt="" />
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