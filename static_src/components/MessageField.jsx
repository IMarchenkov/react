import React from 'react';
import Message from './Message';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";

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
        messageList: [1],
        messages: {
            1: {sender: 'Robot', text: 'Купи слона!', color: 'default'}
        },
        nextId: 2,
    };

    static propTypes = {
        messageCounter: PropTypes.func.isRequired,
    };

    componentDidUpdate(prevProps, prevState) {
        const {nextId, messages, messageList} = this.state;
        const lastSender = messages[nextId - 1].sender;
        const lastMessage = messages[nextId - 1].text;
        if (lastSender === 'me' && messageList.length > prevState.messageList.length) {
            setTimeout(() => this.handleSendMessage(`Все говорят "${lastMessage}", а ты купи слона!`, 'Robot', 'default'), 500)
        }

        if (messageList.length > prevState.messageList.length)
            this.props.messageCounter(messageList.length);
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    handleSendMessage = (text, sender, color) => {
        const {messageList, messages, nextId} = this.state;
        this.setState({
            messageList: [...messageList, nextId],
            messages: {...messages, [nextId]: {text, sender, color}},
            input: '',
            nextId: nextId + 1,
        })
    };

    handleKeyUp = (e) => {
        if (e.keyCode === 13) { // Enter
            this.handleSendMessage(this.state.input, 'me', 'secondary');
        }
    };

    render() {
        const {messages, messageList, input} = this.state;
        const {classes} = this.props;
        const messageElements = messageList
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

export default withStyles(styles)(MessageField);