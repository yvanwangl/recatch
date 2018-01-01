import * as React from 'react';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export interface linkItemProps {
    linkData: any;
    handleValid: () => void;
    handleInvalid: () => void;
}

const LinkItem = ({ linkData, handleValid, handleInvalid }: linkItemProps) => {
    let { name, link, description, status } = linkData;
    let subtitle, subtitleColor;
    switch (status) {
        case 'Valid':
            subtitle = '审核通过';
            subtitleColor = 'green';
            break;
        case 'Review':
            subtitle = '等待审核';
            subtitleColor = '#000';
            break;
        case 'Invalid':
            subtitle = '审核不通过';
            subtitleColor = 'red';
            break;
    }
    return (
        <Card className='LinkItem-card'>
            <CardHeader
                title={<h1 className='LinkItem-card-title'>{name}</h1>}
                subtitle={subtitle}
                subtitleColor={subtitleColor}
            />
            <CardText className='LinkItem-card-text'>
                {description}
                <div>
                    <a style={{textDecoration: 'none'}} href={link} target='_blank'>友链地址</a>
                </div>
            </CardText>
            <CardActions className='LinkItem-card-actions'>
                <FlatButton secondary={true} label="审核通过" onClick={handleValid} />
                <FlatButton primary={true} label="审核不通过" onClick={handleInvalid} />
            </CardActions>
        </Card>
    );
};

export default LinkItem;