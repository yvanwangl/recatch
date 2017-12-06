import * as React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
require('./index.css');

export interface CommentCardProps {
    commentItems: Array<React.ReactNode>
}

export interface CommentCardState {
    expanded: boolean;
}

export default class CommentCard extends React.Component<CommentCardProps, CommentCardState> {
    constructor(props: CommentCardProps) {
        super(props);
        this.state = {
            expanded: false,
        };
    }

    handleExpandChange = (expanded: boolean) => {
        this.setState({ expanded });
    };


    render() {
        let {commentItems} = this.props;
        return (
            <Card className='CommentCard-card' expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                <CardHeader
                    title={<h1 className='CommentCard-card-title'>{commentItems['postName']}</h1>}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                    {commentItems}
                </CardText>
            </Card>
        );
    }
}