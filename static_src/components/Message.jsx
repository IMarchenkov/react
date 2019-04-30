import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar'

const styles = theme => ({
    chip: {
        margin: theme.spacing.unit,
    },
    avatar: {
        width: 'fit-content',
        padding: '2px 5px'
    }
});

class Message extends React.Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        sender: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
    };

    static defaultProps = {
        color: 'primary'
    };

    render() {
        const { classes, color, sender, text } = this.props;
        return (
            <Chip
                avatar={<Avatar className={classes.avatar}>{sender}</Avatar>}
                label={text}
                // onClick={handleClick}
                className={classes.chip}
                color={color}
            />
        )
    }
}

Message.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Message);