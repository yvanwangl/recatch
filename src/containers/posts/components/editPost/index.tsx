import * as React from 'react';
import FlatButton from 'material-ui/FlatButton';
import ListIcon from 'material-ui/svg-icons/action/list';
import TabbarTitle from '../../../../components/tabbarTitle/TabbarTitle';
import { Tabs, Tab } from 'material-ui/Tabs';

export interface EditPostProps {
    initData: any;
    onSave: Function;
}

class EditPost extends React.Component<EditPostProps> {
    render() {
        return (
            <div>
                <TabbarTitle 
                    title = 'Create Post'
                    buttons = {
                        [
                            <FlatButton label="List"  icon={<ListIcon />} primary={true} />
                        ]
                    }
                />
                <Tabs>
                    <Tab label="Item One" buttonStyle={{background: '#fff', color: '#000'}} >
                        <div>
                            <p>
                                This is an example tab.
                            </p>
                            <p>
                                You can put any sort of HTML or react component in here. It even keeps the component state!
                            </p>
                        </div>
                    </Tab>
                    <Tab label="Item Two" >
                        <div>
                            <p>
                                This is another example tab.
                            </p>
                        </div>
                    </Tab>
                    <Tab
                        label="onActive"
                        data-route="/home"
                    >
                        <div>
                            <p>
                                This is a third example tab.
                            </p>
                        </div>
                    </Tab>
                </Tabs>
            </div>

        );
    }
}

export default EditPost;