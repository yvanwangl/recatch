import * as React from 'react';
import { connect } from 'react-redux';
import StoreState from '../../../store/types';
import { fetchStatistics } from '../actions';
import { userAuth } from '../../../utils/util';
import './index.css';

export interface DashBoardProps {
    fetchStatistics: Function;
    dashboard?: any;
}

function mapStateToProps(state: StoreState) {
    return {
        dashboard: state.ui.dashboard,
    };
}

function mapDispatchToProps(dispatch: Function) {
    return {
        fetchStatistics: () => dispatch(fetchStatistics())
    };
}
@(connect(mapStateToProps, mapDispatchToProps) as any)
class DashBoard extends React.Component<DashBoardProps> {

    componentDidMount() {
        let { fetchStatistics } = this.props;
        fetchStatistics();
    }

    render() {
        let { dashboard } = this.props;
        let { authenticate, admin } = userAuth();
        let {
            postCount = 0,
            labelCount = 0,
            commentCount = 0,
            pageViewCount = 0,
            projectCount = 0,
            validLinkCount = 0,
            invalidLinkCount = 0,
            reviewLinkCount = 0,
        } = dashboard || {};
        return (
            <div className="DashBoard">
                <div className='DashBoard-item-wrapper'>
                    <div className='DashBoard-item item-blue'>
                        <h1>{postCount}</h1>
                        <p>博客数量</p>
                    </div>
                    <div className='DashBoard-item item-orange'>
                        <h1>{labelCount}</h1>
                        <p>标签数量</p>
                    </div>
                    <div className='DashBoard-item item-red'>
                        <h1>{commentCount}</h1>
                        <p>评论数量</p>
                    </div>
                </div>

                {
                    authenticate && admin ?
                        <div className='DashBoard-item-wrapper'>
                            <div className='DashBoard-item item-blue'>
                                <h1>{reviewLinkCount + validLinkCount + invalidLinkCount}</h1>
                                <p>友链申请数量</p>
                            </div>
                            <div className='DashBoard-item item-orange'>
                                <h1>{reviewLinkCount}</h1>
                                <p>友链待审核数量</p>
                            </div>
                            <div className='DashBoard-item item-red'>
                                <h1>{validLinkCount}</h1>
                                <p>友链审核通过数量</p>
                            </div>
                            <div className='DashBoard-item item-yellow'>
                                <h1>{invalidLinkCount}</h1>
                                <p>友链审核不通过数量</p>
                            </div>
                        </div>
                        : null
                }
                <div className='DashBoard-item-wrapper'>
                    <div className='DashBoard-item item-red'>
                        <h1>{projectCount}</h1>
                        <p>项目数量</p>
                    </div>
                </div>
                <div className='DashBoard-item item-green item-total-view'>
                    <h1>{pageViewCount}</h1>
                    <p>总访问量</p>
                </div>
            </div>
        );
    }
}


export default DashBoard;