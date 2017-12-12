import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import TodayIcon from 'material-ui/svg-icons/action/today';
import VisibilityIcon from 'material-ui/svg-icons/action/visibility';
import CommentIcon from 'material-ui/svg-icons/communication/comment';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { dateFormat } from '../../../utils/util';

export interface AuthorModel {
	name: string;
	avatar?: string;
}
export interface PostModel {
    id: number | string;
    author: string;
	title: string;
	userId: string;
	userName: string;
	plaintext: string;
	content: string;
	count?: string;
	publishDate: string;
	coverImg: string;
    comments: Array<string>;
    labels: Array<any>;
}

export interface PostItemProps {
	key: string | number;
	post: PostModel;
	handleItemClick: (event: any) => void;
	handleItemModify: () => void;
	handleItemDelete: () => void;
}

export interface PostItemState {
	open: boolean;
}

class PostItem extends React.Component<PostItemProps, PostItemState> {

	constructor(props: PostItemProps) {
		super(props);
		this.state = {
			open: false
		};
	}

	//打开弹窗事件
	handleOpen = () => {
		this.setState({ open: true });
	};

	//关闭弹窗事件
	handleCancel = () => {
		this.setState({ open: false });
	};

	//确认删除博客
	handleDelete = () => {
		this.setState({ open: false });
		this.props.handleItemDelete();
	};

	render() {
		let { handleItemClick, handleItemModify } = this.props;
		let { title, plaintext, count: views, publishDate, coverImg, comments } = this.props.post;
		//dialog Actions
		const actions = [
			<FlatButton
				label="取消"
				primary={true}
				onClick={this.handleCancel}
			/>,
			<FlatButton
				label="确认"
				primary={true}
				keyboardFocused={true}
				onClick={this.handleDelete}
			/>,
		];

		return (
			<span className='PostItem-card' onClick={handleItemClick}>
				<Card style={{ height: '100%' }} containerStyle={{ height: '100%', position: 'relative' }}>
					<CardHeader
						title={<h1 className='PostItem-card-title'>{title}</h1>}
					//avatar={avatar}
					/>
					<CardMedia
						overlay={
							<CardTitle
								style={{ padding: '8 16' }}
								title={
									<div className='PostItem-card-icon-list'>
										<span className='PostItem-card-icon-wrapper'><TodayIcon className='PostItem-card-icon' /> {dateFormat(publishDate)}</span>
										<span className='PostItem-card-icon-wrapper'><VisibilityIcon className='PostItem-card-icon' /> {views}</span>
										<span className='PostItem-card-icon-wrapper'><CommentIcon className='PostItem-card-icon' /> {comments.length}</span>
									</div>
								}
								titleStyle={{ fontSize: 16, display: 'inline-block' }}
							/>
						}
						style={{ overflow: 'hidden' }}
					>
						<img className='PostItem-coverImg' src={coverImg} alt="" />
					</CardMedia>
					{/* <CardTitle title="Card title" subtitle="Card subtitle" /> */}
					<CardText className='PostItem-card-text'>
						{plaintext}
					</CardText>
					<CardActions className='PostItem-card-actions'>
						<FlatButton label="删除" secondary={true} onClick={(e: any) => { e.stopPropagation(); this.handleOpen(); }} />
						<FlatButton label="编辑" primary={true} onClick={(e: any) => { e.stopPropagation(); handleItemModify(); }} />
					</CardActions>
				</Card>
				<Dialog
					title="删除提示"
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleCancel}
				>
					{
						`确认删除博客 《 ${title} 》？ 文章删除后可以联系管理员进行数据恢复 ！`
					}
				</Dialog>
			</span>

		);
	}
}

export default PostItem;