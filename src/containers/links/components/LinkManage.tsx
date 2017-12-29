import * as React from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import StoreState from '../../../store/types';
import { fetchAllLinks, auditLink } from '../actions';
import { linkSelector } from '../selectors';
import TabbarTitle from '../../../components/tabbarTitle/TabbarTitle';
import LinkItem from './LinkItem';
import LinkForm from './LinkForm';

export interface linkManageProps {
    fetchAllLinks: Function;
    auditLink: Function;
    links: any;
}

export interface linkManageState {
    openDialog: boolean;
    initialValues: object;
}

function mapStateToProps(state: StoreState) {
    return {
        links: linkSelector(state)
    }
}

function mapDispatchToProps(dispatch: Function) {
    return {
        fetchAllLinks: () => dispatch(fetchAllLinks()),
        auditLink: (link: any) => dispatch(auditLink(link)),
    }
}

@(connect(mapStateToProps, mapDispatchToProps) as any)
class LabelManage extends React.Component<linkManageProps, linkManageState> {

    constructor(props: linkManageProps) {
        super(props);
        this.state = {
            openDialog: false,
            initialValues: {}
        };
    }

    //审核通过按钮点击事件
    handleAuditValid = (link: any) => () => {
        let { auditLink } = this.props;
        link['status'] = 'Valid';
        auditLink(link);
    };

    //取消按钮点击事件
    handleCancel = () => {
        this.setState({
            openDialog: false
        });
    };

    //审核不通过按钮点击事件
    handleAuditInvalid = (link: any) => () => {
        this.setState({
            openDialog: true,
            initialValues: link
        });
    };

    componentDidMount() {
        let { links, fetchAllLinks } = this.props;
        if (links.length == 0) {
            fetchAllLinks();
        }
    }

    render() {
        let { links, auditLink } = this.props;
        let { openDialog, initialValues } = this.state;
        let linkItems = links.map((link: any) =>
            <LinkItem
                key={link.id}
                linkData={link}
                handleValid={this.handleAuditValid(link)}
                handleInvalid={this.handleAuditInvalid(link)}
            />);
        return (
            <Paper className='Manage-container'>
                <TabbarTitle
                    title='项目管理'
                />
                <div className='LinkManage-item-wrapper'>
                    {linkItems}
                </div>
                {
                    openDialog ?
                        <LinkForm
                            onFormSubmit={auditLink}
                            openDialog={openDialog}
                            handleCancel={this.handleCancel}
                            initialValues={initialValues}
                        />
                        :
                        null
                }
            </Paper>
        );
    }
}

export default LabelManage;