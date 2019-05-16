import React from 'react';
import Message from './Message';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import { sendMessage } from "../actions/messageActions";
import connect from "react-redux/es/connect/connect";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
        margin: theme.spacing.unit,
    }
});

class MessageField extends React.Component {
    state = {
        input: '',
    };

    static propTypes = {
        messageCounter: PropTypes.func.isRequired,
        chats: PropTypes.object.isRequired,
        messages: PropTypes.object.isRequired,
        nextId: PropTypes.number.isRequired,
        sendMessage: PropTypes.func.isRequired,
    };

    componentDidUpdate(prevProps, prevState) {
        const {nextId, messages, chats} = this.props;
        const lastSender = messages[nextId - 1].sender;
        const lastMessage = messages[nextId - 1].text;
        if (lastSender === 'me' && chats[1].messageList.length > prevProps.chats[1].messageList.length) {
            setTimeout(() => this.handleSendMessage(`Все говорят "${lastMessage}", а ты купи слона!`, 'Robot', 'default'), 500)
        }

        if (chats[1].messageList.length > prevProps.chats[1].messageList.length)
            this.props.messageCounter(chats[1].messageList.length);
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    handleSendMessage = (text, sender, color) => {
        this.props.sendMessage(text, sender, color);
    };

    handleKeyUp = (e) => {
        if (e.keyCode === 13) { // Enter
            this.handleSendMessage(this.state.input, 'me', 'secondary');
        }
    };

    render() {
        const { input} = this.state;
        const {classes, messages, chats } = this.props;
        const messageElements = chats[1].messageList
            .map((messageId, index) => <Message
                    key={index}
                    sender={messages[messageId].sender}
                    text={messages[messageId].text}
                    color={messages[messageId].color}
                />
            );

        return (
            <div style={{display: 'flex', flexFlow: 'column nowrap', alignItems: 'flex-start'}}>
                {messageElements}
                <TextField
                    onKeyUp={this.handleKeyUp}
                    label="Message"
                    name="input"
                    value={input}
                    onChange={this.handleInput}
                    placeholder="Введите сообщение"
                    className={classes.textField}
                />
                <Button
                    onClick={() => input && this.handleSendMessage(input, 'me', 'secondary')}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >Отправить сообщение</Button>
            </div>
        )
    }
}

MessageField.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ messageReducer }) => ({
    chats: messageReducer.chats,
    messages: messageReducer.messages,
    nextId: messageReducer.nextId,
});

const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage }, dispatch);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(MessageField));