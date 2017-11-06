import * as React from 'react';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';

const style = {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

class Home extends React.Component {

    render() {
        return (
            <div>
                <Paper style={style} zDepth={1}>
                    <DatePicker hintText="Landscape Inline" container="inline" mode="landscape" />
                </Paper>
            </div>
        );
    }
}

export default Home;