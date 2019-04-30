import React from 'react';
import PropTypes from "prop-types";


export default class Message extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
    };

    static defaultProps = {
        color: 'black'
    };



    render() {
        return (
            <div style={{color: this.props.color}}><b>{ this.props.name }</b>: { this.props.text }</div>
        )
    }
}