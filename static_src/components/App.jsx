import React from 'react';
import Message from './Message';

export default class App extends React.Component {
    state = {
        messages: [
            {name: 'Robot', message: 'Купи слона!', color: "black"}
            ],
    };

    componentDidUpdate(prevProps, prevState, snapshot){
        let len = prevState.messages.length;
        if (len > 0 && this.state.messages[len].name !== 'Robot'){
            console.log(this.state.messages[len]);
            this.sendRobotMessage(this.state.messages[len].message)
        }
    }

    sendMessage = () => {
        let input = document.getElementById('inputMessage');
        this.setState({
            messages: [
                ...this.state.messages,
                {
                    name: "UserName",
                    message: input.value,
                    color: "red"
                }
            ]
        })
        input.value = "";
    };

    sendRobotMessage = (message)=>{
        console.log(message+' robot said');
        this.setState({
            messages: [
                ...this.state.messages,
                {
                    name: "Robot",
                    message: `Все говорят "${message}", а ты купи слона!`,
                    color: "black"
                }
            ]
        })
    };


    render() {
        const messageElements = this.state.messages.map((item, index) => <Message key={ index } text={ item.message } name = {item.name} color = {item.color} />);
        return (
            <div>
                <h1>App</h1>
                { messageElements }
                <input id="inputMessage" type="text"/>
                <button onClick={ this.sendMessage }>sendMessage</button>
                <br />
                <br />
            </div>
        )
    }
}