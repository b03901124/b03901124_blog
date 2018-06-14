import React from 'react';
import MenuDrawer from './MenuDrawer.js';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
    root: {
        flexGRow: 1,
    },
    flex: {
        flex: 1,
    },
    appbar: {
        boxShadow: '0px 0px 1px 1px rgba(0, 0, 0, .30)',
    }
};

class ButtonAppBar extends React.Component {
    constructor(props){
        super(props);
    }
    redirectAuth(e) {
        e.preventDefault();
        sessionStorage.clear();
        this.props.history.push('/login');
    }
    handleClickOpen = (e) => {
        this.props.handleClickOpen(e);
    }
    loginButton = (e) => {
        if(this.props.username === 'Guest mode') {
            return(
                <Button onClick={e => this.redirectAuth(e)}>
                Login</Button>
            )
        } else {
            return(
                <Button onClick={e => this.redirectAuth(e)}>
                Logout</Button>
            )
        }
    }
    titleBar = (classes) => {
        if(this.props.hostname === "") {
            return (
                <Typography variant="title" color="inherit" className={classes.flex}>
                Choose who you want to visit</Typography>
            )
        }
        return (
            <Typography variant="title" color="inherit" className={classes.flex}>
            {this.props.hostname}'s blog</Typography>   
        )
    }
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" color="default" className={classes.appbar}>
                    <Toolbar>
                        <MenuDrawer username={this.props.username} history={this.props.history}
                            handleClickOpen={e => this.handleClickOpen(e)}/>
                        {this.titleBar(classes)}
                        {this.loginButton()}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(ButtonAppBar);