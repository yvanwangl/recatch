import * as React from 'react';
import { BlockPicker, HSLColor, RGBColor, ColorChangeHandler, ColorResult } from 'react-color';

export interface PickerDialogProps {
    value: string | HSLColor | RGBColor;
    onChange: ColorChangeHandler;
    onDialogClick: () => void;
}

export interface PickerDialogState {
    color: string | HSLColor | RGBColor;
}

export default class PickerDialog extends React.Component<PickerDialogProps, PickerDialogState> {

    constructor(props: PickerDialogProps) {
        super(props);
        this.state = {
            color: this.props.value || '#000'
        };
    }

    handleChange = (color: ColorResult) => {
        let { onChange, onDialogClick } = this.props;
        this.setState({
            color: color.hex
        });
        onChange(color);
        onDialogClick();
    };

    render() {
        let { onDialogClick } = this.props;
        let { color } = this.state;
        return (
            <div style={{ position: 'absolute', zIndex: 999 }}>
                <div className='PickerDialog-cover' onClick={onDialogClick} />
                <BlockPicker
                    color ={color}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}