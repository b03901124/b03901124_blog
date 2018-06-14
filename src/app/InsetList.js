import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import InsetListItem from './InsetListItem.js';

const styles = theme => ({
    root: {
        position: 'sticky',
        top: '20%',
        // left: '-20%',
        right: '40%',
        width: '120%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        padding: 0,
        margin: theme.spacing.unit * 6,
    },
});

class InsetList extends React.Component　{
    constructor(props) {
        super(props);
    }
    handlePreviewCb = (key) => {
        this.props.handlePreviewCb(key);
    }

    render() {
        const {classes} = this.props;
        var listItems = this.props.postList.map(item => (
            <InsetListItem
                hashNum={item.hash}
                key={item.hash}
                title={item.title}
                time={item.time}
                pressed={item.pressed}
                handlePreviewCb={this.handlePreviewCb}
            />
        ));
        return (
            <div className={classes.root}>
                <List component="nav"
                    subheader={<ListSubheader component="div">Article List</ListSubheader>}>
                    {listItems}
                </List>
            </div>
        )
    }
}

export default withStyles(styles)(InsetList);