import React from 'react';
// import {render} from 'react-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';

class InsetListItem extends React.Component {
    constructor(props) {
        super(props);
        // this.onPressed = this.onPressed.bind(this);
    }
    handlePreviewCb = (e) => {
        e.preventDefault();
        this.props.handlePreviewCb(this.props.hashNum);
    };
    handleClick = () => {
        window.location.hash = this.props.hashNum
    }

    onPressed = () => {
        if(this.props.pressed ===false) {
            return null;
        }
        return (<ListItemIcon>
            <StarIcon />
            </ListItemIcon>);
    }

    render() {
        return (
            <ListItem button divider
                onClick={this.handleClick}>
                {/* // onClick={e => this.handlePreviewCb(e)}> */}
                {/* {this.onPressed()} */}
                <ListItemText primary={this.props.title} secondary={this.props.time}/>
            </ListItem>
        )
    }
}

export default InsetListItem;