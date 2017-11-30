import * as React from 'react';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import Check from 'material-ui/svg-icons/navigation/check';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Delete from 'material-ui/svg-icons/action/delete';

export interface ColumnProps {
    value: string | boolean | object;
    width?: number;
    type: string;
    dataIndex: string;
}

export interface RowProps {
    columns: Array<ColumnProps>;
    id?: string | number;
    selected: boolean;
    phantom: boolean;
    primaryId: string | number;
}

export interface EditTableProps {
    headerColumns: Array<ColumnProps>;
    rows: Array<RowProps>;
    onChange: Function;
    onDelete: Function;
    enableDelete: boolean;
}

export interface EditTableState {
    rows: Array<RowProps>;
    hoverValue: boolean;
    currentRow: boolean;
}

export default class EditTable extends React.Component<EditTableProps, EditTableState> {

    constructor(props: EditTableProps) {
        super(props);
        let rows = this.props.rows.map((row, index) => ({ ...row, phantom: false, primaryId: row.id || -(index + 1) }));
        this.state = {
            rows: rows,
            hoverValue: false,
            currentRow: false
        };
    }

    static defaultProps = {
        headerColumns: [],
        rows: [],
        enableDelete: true,
        onChange: function () { },
        onDelete: function () { }
    };

    update = () => {
        const row = this.state.rows.filter((row: any) => {
            return row.selected
        })[0];
        let rowData = row.columns.reduce((data, { dataIndex, value }) => Object.assign(data, { [dataIndex]: value }), {});
        rowData['phantom'] = row.phantom;
        rowData['id'] = row.primaryId;
        this.props.onChange(rowData);
    };

    getCellValue = (cell: any) => {
        const self = this;
        const id = cell && cell.id;
        const type = this.props.headerColumns.map((header: any) => {
            return header.type
        })[id];
        const selected = cell && cell.selected;
        const value = cell && cell.value;
        const rowId = cell && cell.rowId;
        const header = cell && cell.header;
        const width = cell && cell.width;
        const textFieldId = [id, rowId, header, 'text'].join('-');
        const datePickerId = [id, rowId, header, 'date'].join('-');

        const textFieldStyle = {
            width: width
        };

        const datePickerStyle = {
            width: width
        };

        const onTextFieldChange = (e: any) => {
            const target = e.target
            const value = target.value
            var rows = self.state.rows
            rows[rowId].columns[id].value = value
            self.setState({ rows: rows })
        };

        const onDatePickerChange = (e: any, date: any) => {
            var rows = self.state.rows
            rows[rowId].columns[id].value = date
            self.setState({ rows: rows })
        };

        const onToggle = (e: any) => {
            var rows = self.state.rows
            rows[rowId].columns[id].value = !rows[rowId].columns[id].value
            self.setState({ rows: rows })
        };

        if (header || (type && type === 'ReadOnly')) {
            return <p style={{ color: '#888' }}>{value}</p>
        }

        if (type) {
            if (selected) {
                if (type === 'TextField') {
                    return <TextField
                        id={textFieldId}
                        onChange={onTextFieldChange}
                        style={textFieldStyle}
                        value={value}
                    />
                }
                if (type === 'DatePicker') {
                    return <DatePicker
                        id={datePickerId}
                        onChange={onDatePickerChange}
                        mode='landscape'
                        style={datePickerStyle}
                        value={value}
                    />
                }
                if (type === 'Toggle') {
                    return <Toggle onToggle={onToggle} toggled={value} />
                }
            } else {
                if (type === 'Toggle') {
                    return <Toggle disabled onToggle={onToggle} toggled={value} />
                }
                if (type === 'DatePicker') {
                    return <DatePicker
                        id={datePickerId}
                        onChange={onDatePickerChange}
                        mode='landscape'
                        style={datePickerStyle}
                        value={value}
                        disabled={Boolean(true)}
                    />
                }
            }
        }

        return <TextField
            id={textFieldId}
            style={textFieldStyle}
            disabled
            value={value}
        />
    };

    renderHeader = () => {
        const headerColumns = this.props.headerColumns
        const columns = headerColumns.map((column, id) => {
            return { value: column.value }
        })
        const row = { columns: columns, header: true }

        return this.renderRow(row);
    };



    renderRow = (row: any) => {
        const self = this;
        const columns = row.columns;
        const rowStyle = {
            width: '100%',
            display: 'flex',
            flexFlow: 'row nowrap',
            padding: row.header ? 0 : 12,
            border: 0,
            borderBottom: '1px solid #ccc',
            height: 50,
            boxSizing: 'border-box',
            alignItems: 'center'
        };
        const checkboxStyle = {
            display: 'flex',
            flexFlow: 'row nowrap',
            width: 50,
            height: 24,
            alignItems: 'center'
        };

        let deleteButtonStyle = {
            display: 'flex',
            flexFlow: 'row nowrap',
            width: 50,
            height: 24,
            alignItems: 'center',
            padding: '0 12 0'
        };

        const rowId = row.id;
        const rowKey = ['row', rowId].join('-');

        const onRowClick = function (e: any) {
            var rows = self.state.rows;
            rows.forEach((row, i) => {
                if (rowId !== i) row.selected = false
            })
            rows[rowId].selected = !rows[rowId].selected
            self.setState({ rows: rows })
        }

        const r = self.state.rows[rowId]
        const selected = (r && r.selected) || false

        const button = selected ? <Check /> : <ModeEdit />
        const tooltip = selected ? 'Done' : 'Edit'

        const onDeleteRow = function (e: any) {
            let rows = self.state.rows
            let deleteEvent = {} as any;
            rows.forEach((row, i) => {
                if (rowId === i) {
                    rows.splice(i, 1);
                    deleteEvent = { id: row.primaryId, primaryId: row.primaryId, phantom: row.phantom };
                }
            })
            rows.forEach((row, i) => {
                row.id = i
            })
            self.setState({ rows: rows })
            if (deleteEvent.primaryId != undefined) {
                self.props.onDelete(deleteEvent)
            }
        }

        const onClick = function (e: any) {
            if (selected) {
                self.update()
            }

            onRowClick(e)
        }

        const deleteButton = (!this.props.enableDelete || selected || row.header) ?
            <div style={deleteButtonStyle as any} />
            :
            <IconButton style={deleteButtonStyle as any} tooltip={'Delete this row'} onClick={onDeleteRow}>
                <Delete />
            </IconButton>

        const checkbox = row.header ?
            <div style={checkboxStyle as any} />
            :
            <IconButton style={checkboxStyle as any} tooltip={tooltip} onClick={onClick}>
                {button}
            </IconButton>

        return (
            <div key={rowKey} className='row' style={rowStyle as any}>
                {checkbox}
                {columns.map((column: any, id: number) => {
                    const width = this.props.headerColumns.map((header) => {
                        return (header && header.width) || false
                    })[id]
                    const cellStyle = {
                        display: 'flex',
                        flexFlow: 'row nowrap',
                        flexGrow: 0.15,
                        flexBasis: 'content',
                        alignItems: 'center',
                        height: 30,
                        width: width || 200
                    }
                    const columnKey = ['column', id].join('-')
                    column.selected = selected
                    column.rowId = rowId
                    column.id = id
                    column.header = row.header
                    column.width = cellStyle.width
                    return (
                        <div key={columnKey} className='cell' style={cellStyle as any}>
                            <div>
                                {this.getCellValue(column)}
                            </div>
                        </div>
                    )
                })}
                {deleteButton}
            </div>
        )
    };

    render() {
        const self = this;
        const containerStyle = {
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'Roboto, sans-serif'
        };

        const buttonStyle = {
            display: 'flex',
            flexFlow: 'row nowrap',
            marginTop: 10
        };

        const { rows } = self.state;
        const { headerColumns } = self.props;

        const onButtonClick = (e: any) => {
            const defaults = {
                'TextField': '',
                'Toggle': true,
                'DatePicker': {}
            };
            const newColumns = headerColumns.map((column, index) => {
                const value = defaults[column.type];
                return { ...column, value };
            });

            const updatedRows = rows.map((row) => {
                if (row.selected) {
                    self.update()
                    row.selected = false
                }
                return row
            })
            updatedRows.push({ columns: newColumns, selected: true, id: updatedRows.length, phantom: true, primaryId: -(updatedRows.length + 1) });
            self.setState({ rows: updatedRows })
        }

        return (
            <div className='container' style={containerStyle as any}>
                {this.renderHeader()}
                {rows.map((row, id) => {
                    row.id = id
                    return this.renderRow(row)
                })}
                <RaisedButton
                    onClick={onButtonClick}
                    style={buttonStyle}
                    label='Add Row'
                />
            </div>
        )
    }
}