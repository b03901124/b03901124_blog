import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

const styles = {
    list: {
        width: 250,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    // button: {
    //     color: 'rebeccapurple'
    // }
};

class MenuDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            left: false,
        }
    }
    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        })
    }
    redirectAuth = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        this.props.history.push('/login');
    }
    returnUser = (e) => {
        e.preventDefault();
        this.props.history.push('/blog/' + this.props.username);
        location.reload();
    }
    handleClickOpen = (e) => {
        e.preventDefault();
        this.props.handleClickOpen(e);
    }
    loginButton = () => {
        if(this.props.username === 'Guest mode') {
            return(
                <List>
                    <ListItem button style={{color: 'rebeccapurple'}}
                        onClick={e => this.handleClickOpen(e)}>
                    User List</ListItem>
                    <ListItem button style={{color: 'rebeccapurple'}} onClick={e => this.redirectAuth(e)}>
                    Login</ListItem>
                </List>
            )
        } else {
            return (
                <List>
                    <ListItem dense button
                        onClick={e => this.returnUser(e)}>
                        {/* <Avatar/> */}
                        <ListItemText primary={this.props.username + ', welcome back!'}/>
                    </ListItem>
                    <ListItem button style={{color: 'rebeccapurple'}} onClick={e => this.returnUser(e)}>
                    My Blog</ListItem>
                    <ListItem button style={{color: 'rebeccapurple'}} onClick={e => this.handleClickOpen(e)}>
                    User List</ListItem>
                    <ListItem button style={{color: 'rebeccapurple'}} onClick={e => this.redirectAuth(e)}>
                    Logout</ListItem>
                </List>
            )
        }
    }
    render() {
        const {classes} = this.props;

        const sideList = (
            <div className={classes.list}>
                {this.loginButton()}
            </div>
        )

        return (
            <div>
                <IconButton className={classes.menuButton} onClick={this.toggleDrawer('left', true)}
                    color="inherit" aria-label="Menu">
                    <MenuIcon/>
                </IconButton>
                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}>
                        {sideList}
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default withStyles(styles)(MenuDrawer);
