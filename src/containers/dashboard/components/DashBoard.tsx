import * as React from 'react';
import './index.css';

// export interface DashBoardProps {
//     posts: Array<PostModel>;
//     fetchPosts: Function;
// }

class DashBoard extends React.Component {

    // handleRefresh = () => {
    //     this.props.fetchPosts();
    // }

    // componentDidMount() {
    //     this.props.fetchPosts();
    // }

    render() {
        return (
            <div className="DashBoard">
                <div className='DashBoard-item item-blue'>
                    <h1>344</h1>
                    <p>博客数量</p>
                </div>
                <div className='DashBoard-item item-orange'>
                    <h1>344</h1>
                    <p>评论数量</p>
                </div>
                <div className='DashBoard-item item-red'>
                    <h1>34322</h1>
                    <p>总访问量</p>
                </div>
                <div className='DashBoard-item item-green'>
                    <h1>34322</h1>
                    <p>总访问量</p>
                </div>
            </div>
        );
    }
}


export default DashBoard;