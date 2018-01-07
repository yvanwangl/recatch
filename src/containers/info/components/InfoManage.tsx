import * as React from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import StoreState from '../../../store/types';
import { fetchUserInfo, modifyEmail } from '../action';
import { infoSelector } from '../selectors';
import TabbarTitle from '../../../components/tabbarTitle/TabbarTitle';
import EditEmail from './EditEmail';

export interface InfoManageProps {
    fetchUserInfo: Function;
    modifyEmail: Function;
    info: any;
}

function mapStateToProps(state: StoreState) {
    return {
        info: infoSelector(state)
    }
}

function mapDispatchToProps(dispatch: Function) {
    return {
        fetchUserInfo: () => dispatch(fetchUserInfo()),
        modifyEmail: (info: any) => dispatch(modifyEmail(info)),
    }
}

@(connect(mapStateToProps, mapDispatchToProps) as any)
class InfoManage extends React.Component<InfoManageProps> {

    componentDidMount() {
        let { info, fetchUserInfo } = this.props;
        if (info.length == 0) {
            fetchUserInfo();
        }
    }

    render() {
        let { modifyEmail, info } = this.props;
        return (
            <Paper className='Manage-container'>
                <TabbarTitle title='个人信息管理' />
                <div style={{ padding: 30 }}>
                    {
                        info.length > 0 ?
                            <EditEmail
                                initialValues={info[0]}
                                onSubmit={modifyEmail}
                            /> :
                            null
                    }
                </div>
            </Paper>
        );
    }
}

export default InfoManage;