import React from 'react';
import MessageField from './MessageField';
import PropTypes from "prop-types";
import ChatList from './ChatList';
import Header from './Header';


export default class Layout extends React.Component {

    state = {
        messageCount: 1
    };

    messageCounter = (messageCount) => {
        this.setState({ messageCount })
    };

    render() {
        return (
            <div style={{ display: 'grid', gridTemplateAreas: "'header header''aside chat", gridTemplateColumns: "1fr 2fr"}}>
                <header style={{ gridArea: "header"}}>
                    <Header  messageCount={this.state.messageCount} />
                </header>
                <div style={{ gridArea: "aside"}}>
                    <ChatList />
                </div >
                <div style={{ gridArea: "chat"}}>
                    <MessageField messageCounter={ this.messageCounter } />
                </div>
            </div>
        )
    }
}