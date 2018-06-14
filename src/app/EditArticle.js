import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import Save from '@material-ui/icons/Save';
import Delete from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 10,
        paddingBottom: 16,
        margin: theme.spacing.unit * 8,
    }),
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%'
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

class EditArticle extends React.Component {
    constructor(props) {
        super(props);
    }
    handleTitleChange = (event) => {
        this.props.handleTitleCb(event.target.value);
    };
    handleChange = (event) => {
        this.props.handleContentCb(event.target.value);
    };
    savePostCb = (e) => {
        this.props.savePostCb();
    };
    cancelPostCb = (e) => {
        this.props.cancelPostCb();
    };

    render() {
        const {classes} = this.props;
        return(
            <Card className={classes.root} elevation={4}>
      
            <TextField
                id="name"
                label="Title"
                className={classes.textField}
                value={this.props.title}
                onChange={e => this.handleTitleChange(e)}
                margin="normal"
              />
            <TextField
            id="multiline-static"
            label="Content"
            multiline
            rows="15"
            value={this.props.content}
            onChange={e => this.handleChange(e)}
            className={classes.textField}
            margin="normal"
          />
          <Button variant="outlined" color="secondary" className={classes.button}
              onClick={e => this.cancelPostCb(e)}>
              Cancel
              <Delete className={classes.rightIcon} />
          </Button>
          <Button variant="outlined" color="primary" className={classes.button} onClick={e => this.savePostCb(e)}>
              <Save className={classNames(classes.leftIcon, classes.iconSmall)} />
              Save
            </Button>
          </Card>
        )
    }
}

export default withStyles(styles)(EditArticle);