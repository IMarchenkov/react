import React from 'react';
import PropTypes from "prop-types";


export default class Header extends React.Component {

    static propTypes = {
        messageCount: PropTypes.number.isRequired,
    };

    render() {
        return (
            <h1>Header ({this.props.messageCount})</h1>
        )
    }
}