import * as React from 'react';

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
            <div>
                <span>{author}</span>
                <span>{content}</span>
                <span>{views}</span>
                <span>{publishDate}</span>
            </div>
        );
    }
}

export default PostItem;