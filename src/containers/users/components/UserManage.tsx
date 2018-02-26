import * as React from 'react';
import Paper from 'material-ui/Paper';
import TabbarTitle from '../../../components/tabbarTitle/TabbarTitle';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import { connect } from 'react-redux';
import StoreState from '../../../store/types';
import { fetchUserList, lockUser } from '../actions';
import { userListSelector } from '../selectors';

export interface UserManageProps {
    fetchUserList: Function;
    lockUser: Function;
    userList: any;
}

function mapStateToProps(state: StoreState) {
    return {
        userList: userListSelector(state)
    };
}

function mapDispatchToProps(dispatch: Function) {
    return {
        fetchUserList: () => dispatch(fetchUserList()),
        lockUser: (userId: string) => dispatch(lockUser(userId))
    };
}

@(connect(mapStateToProps, mapDispatchToProps) as any)
class UserManage extends React.Component<UserManageProps>{

    handleRowSelection = (selectedRows : Array<any>)=>{
        console.log(selectedRows);
    };

    componentDidMount() {
        let { userList, fetchUserList } = this.props;
        if (userList.length == 0) {
            fetchUserList();
        }
    }

    render() {
        let { userList } = this.props;
        return (
            <Paper className='Manage-container'>
                <TabbarTitle title='用户管理' />
                <div style={{ padding: 30 }}>
                    <Table onRowSelection={this.handleRowSelection}>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>编号</TableHeaderColumn>
                                <TableHeaderColumn>用户名</TableHeaderColumn>
                                <TableHeaderColumn>邮箱</TableHeaderColumn>
                                <TableHeaderColumn>管理员</TableHeaderColumn>
                                <TableHeaderColumn>状态</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                userList.map(({ username, email, admin, status, id }: any, index: number) => (
                                    <TableRow key={id}>
                                        <TableRowColumn> {index + 1} </TableRowColumn>
                                        <TableRowColumn> {username} </TableRowColumn>
                                        <TableRowColumn> {email} </TableRowColumn>
                                        <TableRowColumn> {status} </TableRowColumn>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </Paper>
        );
    }
}

export default UserManage;