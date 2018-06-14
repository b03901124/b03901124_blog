import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        margin: theme.spacing.unit * 6,
    }),
    button: {
        margin: theme.spacing.unit,
    },
});

class PreviewArticle extends React.Component {
    constructor(props) {
        super(props);
        this.showCard = this.showCard.bind(this);
    }

    handleEditCb = (e) => {
        e.preventDefault();
        // data.hash = this.props.key
        // data.title = this.props.title
        // data.content = this.props.content
        // data.time = this.props.time
        // console.log()
        this.props.handleEditCb(this.props);
    }
    deleteArticleCb = (e) => {
        e.preventDefault();
        this.props.deleteArticleCb();
    }

    funcButton(classes) {
        if(this.props.isSelf === false) return null;
        return(
            <div style={{marginLeft: '80%'}}>
                <Button size='small' variant="contained" color="primary"
                    className={classes.button}
                    onClick={(e) => this.props.deleteArticleCb(e, this.props.hash)}>Delete</Button>
                <Button size='small' variant="contained" color="primary"
                    className={classes.button}
                    onClick={(e) => this.props.handleEditCb(e, this.props)}>Edit</Button>
            </div>
        )
    }
    showCard = (classes) => {
        if(this.props.time === "") {
            return null;
        }
        return (
            <Card className={classes.root} elevation={4}>
                <Typography variant="headline">
                    {this.props.title}
                </Typography>
                <Typography variant="caption">
                    {this.props.time}
                </Typography>
                <Typography variant="body1">
                    {this.props.content}
                </Typography>
                {this.funcButton(classes)}
            </Card>
        )
    }
    render() {
        const {classes} = this.props;
        return (
            <div>
                {this.showCard(classes)}
            </div>
        )
    }
}

export default withStyles(styles)(PreviewArticle);