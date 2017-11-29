import * as React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';

export interface ColumnProps {
    value: string | boolean;
}

export interface RowProps {
    columns: Array<ColumnProps>;
    rowId: string | number;
}

export interface EditTableProps {
    headerColumns: Array<ColumnProps>;
    rows: Array<RowProps>;
    onChange: Function;
}

export interface EditTableState {
    rows: Array<RowProps>;
}

export default class EditTable extends React.Component<EditTableProps, EditTableState> {
    getDefaultProps = () => {
        return {
            headerColumns: [],
            rows: [],
            enableDelete: true,
            onChange: function () { },
            onDelete: function () { }
        };
    };

    getInitialState = () => {
        return {
            rows: this.props.rows,
            hoverValue: false,
            currentRow: false
        };
    };

    update = () => {
        const row = this.state.rows.filter((row: any) => {
            return row.selected
        });
        this.props.onChange(row[0]);
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



    // renderRow = () => {
    //     const self = this
    //     const columns = row.columns
    //     const rowStyle = {
    //         width: '100%',
    //         display: 'flex',
    //         flexFlow: 'row nowrap',
    //         padding: row.header ? 0 : 12,
    //         border: 0,
    //         borderBottom: '1px solid #ccc',
    //         height: 50
    //     }
    //     const checkboxStyle = {
    //         display: 'flex',
    //         flexFlow: 'row nowrap',
    //         width: 50,
    //         height: 24,
    //         alignItems: 'center'
    //     }

    //     const deleteButtonStyle = {
    //         display: 'flex',
    //         flexFlow: 'row nowrap',
    //         width: 50,
    //         height: 24,
    //         alignItems: 'center',
    //         padding: '0 12 0'
    //     }

    //     const rowId = row.id
    //     const rowKey = ['row', rowId].join('-')

    //     const onRowClick = function (e) {
    //         var rows = self.state.rows
    //         rows.forEach((row, i) => {
    //             if (rowId !== i) row.selected = false
    //         })
    //         rows[rowId].selected = !rows[rowId].selected
    //         self.setState({ rows: rows })
    //     }

    //     const r = self.state.rows[rowId]
    //     const selected = (r && r.selected) || false

    //     const button = selected ? <Check /> : <ModeEdit />
    //     const tooltip = selected ? 'Done' : 'Edit'

    //     const onDeleteRow = function (e) {
    //         var rows = self.state.rows
    //         var deleteEvent = {}
    //         rows.forEach((row, i) => {
    //             if (rowId === i) {
    //                 rows.splice(i, 1)
    //                 deleteEvent = { rowId, row }
    //             }
    //         })
    //         rows.forEach((row, i) => {
    //             row.id = i
    //         })
    //         self.setState({ rows: rows })
    //         if (deleteEvent !== {}) self.props.onDelete(deleteEvent)
    //     }

    //     const onClick = function (e) {
    //         if (selected) {
    //             self.update()
    //         }

    //         onRowClick(e)
    //     }

    //     const deleteButton = (!this.props.enableDelete || selected || row.header) ? <div style={deleteButtonStyle} />
    //         : <IconButton style={deleteButtonStyle} tooltip={'Delete this row'} onClick={onDeleteRow}>
    //             <Delete />
    //         </IconButton>

    //     const checkbox = row.header ? <div style={checkboxStyle} />
    //         : <IconButton style={checkboxStyle} tooltip={tooltip} onClick={onClick}>
    //             {button}
    //         </IconButton>

    //     return (
    //         <div key={rowKey} className='row' style={rowStyle}>
    //             {checkbox}
    //             {columns.map((column, id) => {
    //                 const width = this.props.headerColumns.map((header) => {
    //                     return (header && header.width) || false
    //                 })[id]
    //                 const cellStyle = {
    //                     display: 'flex',
    //                     flexFlow: 'row nowrap',
    //                     flexGrow: 0.15,
    //                     flexBasis: 'content',
    //                     alignItems: 'center',
    //                     height: 30,
    //                     width: width || 200
    //                 }
    //                 const columnKey = ['column', id].join('-')
    //                 column.selected = selected
    //                 column.rowId = rowId
    //                 column.id = id
    //                 column.header = row.header
    //                 column.width = cellStyle.width
    //                 return (
    //                     <div key={columnKey} className='cell' style={cellStyle}>
    //                         <div>
    //                             {this.getCellValue(column)}
    //                         </div>
    //                     </div>
    //                 )
    //             })}
    //             {deleteButton}
    //         </div>
    //     )
    // };
}