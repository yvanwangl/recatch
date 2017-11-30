import * as React from 'react';
import {connect} from 'react-redux';
import {addLabel} from '../actions';
import EditTable, {RowProps} from '../../../components/editTable/EditTable';

const headers = [
    { value: 'Name', dataIndex: 'name', type: 'TextField', width: 200 },
    { value: 'Address', dataIndex: 'address', type: 'TextField', width: 200 },
    { value: 'Phone', dataIndex: 'phone', type: 'TextField', width: 200 },
    { value: 'Date', dataIndex: 'date', type: 'DatePicker', width: 200 },
    { value: 'Enabled', dataIndex: 'enabled', type: 'Toggle', width: 50 },
    { value: 'Last Edited By', dataIndex: 'creator', type: 'ReadOnly', width: 100 }
];

const rows = new Array<RowProps>();

export interface LabelManageProps {
    addLabel: Function;
}

function mapDispatchToProps(dispatch: Function){
    return {
        addLabel: (label: any) => dispatch(addLabel(label))
    }
}

@(connect(null, mapDispatchToProps) as any)
class LabelManage extends React.Component<LabelManageProps> {


    onChange = (row: any) => {
        //如果为虚拟数据，则为保存； 否则为修改
        let {addLabel} = this.props;
        if(row.phantom){
            addLabel(row);
        }
        console.log(row)
    }

    onDelete = (e: any) => {
        //如果为虚拟数据则不处理，否则调删除接口
        console.log(e)
    }

    render() {
        return (
            <EditTable
                onChange={this.onChange}
                onDelete={this.onDelete}
                rows={rows}
                headerColumns={headers}
                enableDelete={true}
            />
        );
    }
}

export default LabelManage;