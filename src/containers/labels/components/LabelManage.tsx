import * as React from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import StoreState from '../../../store/types';
import { fetchAllLabels, addLabel, modifyLabel, deleteLabel } from '../actions';
import { labelSelector } from '../selectors';
import EditTable from '../../../components/editTable/EditTable';
import TabbarTitle from '../../../components/tabbarTitle/TabbarTitle';

const headers = [
    { value: '名称', dataIndex: 'name', type: 'TextField', width: 200 },
    { value: '背景颜色', dataIndex: 'bgColor', type: 'ColorPicker', width: 150 },
    { value: '字体颜色', dataIndex: 'fontColor', type: 'ColorPicker', width: 150 },
    { value: '是否可用', dataIndex: 'enabled', type: 'Toggle', width: 50 },
    { value: '样式', dataIndex: 'labelStyle', type: 'Chip', width: 200 },
];

// const dataSource = [{
//     id: 1, name: 'React', bgColor: '#000', fontColor: '#fff', enabled: false
// }];

export interface LabelManageProps {
    fetchAllLabels: Function;
    addLabel: Function;
    modifyLabel: Function;
    deleteLabel: Function;
    labels: any;
}

function mapStateToProps(state: StoreState) {
    return {
        labels: labelSelector(state)
    }
}

function mapDispatchToProps(dispatch: Function) {
    return {
        fetchAllLabels: () => dispatch(fetchAllLabels()),
        addLabel: (label: any) => dispatch(addLabel(label)),
        modifyLabel: (label: any) => dispatch(modifyLabel(label)),
        deleteLabel: (id: number | string) => dispatch(deleteLabel(id)),
    }
}

@(connect(mapStateToProps, mapDispatchToProps) as any)
class LabelManage extends React.Component<LabelManageProps> {


    onChange = (row: any) => {
        //如果为虚拟数据，则为保存； 否则为修改
        let { addLabel, modifyLabel } = this.props;
        if (row.phantom) {
            addLabel(row);
        } else {
            modifyLabel(row);
        }
    }

    onDelete = (row: any) => {
        //如果为虚拟数据则不处理，否则调删除接口
        let { deleteLabel } = this.props;
        if (!row.phantom) {
            deleteLabel(row.id);
        }
    }

    componentDidMount() {
        let { labels, fetchAllLabels } = this.props;
        if (labels.length == 0) {
            fetchAllLabels();
        }
    }

    render() {
        let { labels } = this.props;
        return (
            <Paper className='Manage-container'>
                <TabbarTitle title='标签管理' />
                <div style={{ padding: 30 }}>
                    <EditTable
                        onChange={this.onChange}
                        onDelete={this.onDelete}
                        dataSource={labels}
                        headerColumns={headers}
                        enableDelete={true}
                    />
                </div>
            </Paper>
        );
    }
}

export default LabelManage;