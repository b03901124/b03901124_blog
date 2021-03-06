import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';

const styles = {
    acatar: {
        backgroundColor: blue[100],
        color: blue[600],
    }
}

class SimpleDialog extends React.Component {
    constructor(props){
        super(props);
    }
    handleClick = (e, value) => {
        this.props.onClose(value);
    }

    render() {
        const { classes, onClose, selectedValue, ...other } = this.props

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">
                    Choose the user you want to visit</DialogTitle>
                <div>
                    <List>
                        {this.props.users.map(user => (
                            <ListItem button onClick={(e)=> this.handleClick(e, user.name)} key={user.name}>
                                <ListItemText primary={user.name}/>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Dialog>
        )
    }
}

export default withStyles(styles)(SimpleDialog);
