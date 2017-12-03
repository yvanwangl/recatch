import * as React from 'react';
import Paper from 'material-ui/Paper';
import { Route } from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import DashBoardIcon from 'material-ui/svg-icons/action/dashboard';
import PostListIcon from 'material-ui/svg-icons/action/list';
import MenuLink from '../../components/menuLink/MenuLink';
import DashBoard from '../dashboard/components/DashBoard';
import PostManage from '../posts/components/PostManage';
import LabelManage from '../labels/components/LabelManage';

const PADDING = 30;

// const style = {
//     height: 100,
//     width: 100,
//     margin: 20,
//     textAlign: 'center',
//     display: 'inline-block',
// };

export interface AppState {
    drawerOpen: boolean;
}

class Home extends React.Component<object, AppState> {

    constructor(props: any) {
        super(props);
        this.state = {
            drawerOpen: true
        };
    }

    handleClick = () => {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        });
    };


    render() {
        return (
            <div>
                <AppBar
                    title="Title"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    style={{ zIndex: 9999 }}
                    onLeftIconButtonTouchTap={this.handleClick}
                />
                <div style={{
                    backgroundColor: 'rgb(237, 236, 236)',
                    display: 'flex',
                    flex: '1 1 0%'
                }}>
                    <Drawer
                        containerStyle={{ top: 64 }}
                        open={this.state.drawerOpen}
                    >
                        <MenuItem primaryText={<MenuLink to='/' linkText='主页' />} leftIcon={<DashBoardIcon />} />
                        <MenuItem primaryText={<MenuLink to='/labels' linkText='标签' />} leftIcon={<PostListIcon />} />
                        <MenuItem primaryText={<MenuLink to='/posts' linkText='文章' />} leftIcon={<PostListIcon />} />
                    </Drawer>
                    <div style={{ position: 'fixed', padding: PADDING, top: 64, left: this.state.drawerOpen ? 256 : 0, right: 0, bottom: 0, overflowY: 'scroll', transition: 'left 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms' }}>
                        <Paper style={{ minHeight: '100%', paddingBottom: PADDING}}>
                            <Route exact path="/" component={DashBoard} />
                            <Route path="/labels" component={LabelManage} />
                            <Route path="/posts" component={PostManage} />
                        </Paper>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;