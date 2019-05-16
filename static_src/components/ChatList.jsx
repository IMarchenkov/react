import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from "prop-types";
import {sendMessage} from "../actions/messageActions";
import Message from "./Message";
import connect from "react-redux/es/connect/connect";



const styles = theme => ({
    chat:{
        textTransform: 'capitalize'
    }
});

class ChatList extends React.Component {

    static propTypes = {
        chats: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
    };



    render() {
        const { chats, classes } = this.props;

        const chatElements = Object.entries(chats)
            .map((chat, index) => <ListItemText
                    key={index}
                    primary={chat[1].name}
                    className={classes.chat}
                />
            );
        return (
            <List>
                <ListItem>
                    {chatElements}
                </ListItem>
            </List>
        )
    }
}

const mapStateToProps = ({ messageReducer }) => ({
    chats: messageReducer.chats,
});

export default withStyles(styles)(connect(mapStateToProps)(ChatList));