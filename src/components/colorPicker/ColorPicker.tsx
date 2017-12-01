import * as React from 'react';
import TextField from 'material-ui/TextField';
import PickerDialog from './PickerDialog';
import './index.css';

export interface ColorPickerProps {
    id?: string;
    onChange: Function;
    disabled?: boolean;
    value: string;
}

export interface ColorPickerState {
    showDialog: boolean;
    color: string;
}

export default class ColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {

    constructor(props: any) {
        super(props);
        this.state = {
            showDialog: false,
            color: this.props.value
        };
    }

    handleChange = (color: any) => {
        let { onChange } = this.props;
        this.setState({
            color: color.hex
        });
        onChange(color.hex);
    };

    handleFocus = () => {
        this.setState({
            showDialog: true
        });
    };

    handleDialogClick = () => {
        this.setState({
            showDialog: false
        });
    }

    render() {
        let { id, disabled } = this.props;
        let { showDialog, color } = this.state;
        return (
            <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className='ColorPicker-colorDot' style={{ background: `${color}` }}></span>
                    <TextField
                        disabled={disabled}
                        id={id}
                        onFocus={this.handleFocus}
                        value={color}
                    />
                </div>
                {
                    showDialog ?
                        <PickerDialog
                            value={color}
                            onChange={this.handleChange}
                            onDialogClick={this.handleDialogClick}
                        /> : null
                }
            </div>
        );
    }
}