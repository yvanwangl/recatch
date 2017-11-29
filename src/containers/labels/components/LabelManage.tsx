import * as React from 'react';
import EditTable, {RowProps} from '../../../components/editTable/EditTable';

const headers = [
    { value: 'Name', type: 'TextField', width: 200 },
    { value: 'Address', type: 'TextField', width: 200 },
    { value: 'Phone', type: 'TextField', width: 200 },
    { value: 'Date', type: 'DatePicker', width: 200 },
    { value: 'Enabled', type: 'Toggle', width: 50 },
    { value: 'Last Edited By', type: 'ReadOnly', width: 100 }
];

const rows = new Array<RowProps>();

class LabelManage extends React.Component {


    onChange = (row: any) => {
        console.log(row)
    }

    onDelete = (e: any) => {
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