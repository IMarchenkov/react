import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux'
import initStore from './utils/store';

ReactDOM.render(
    <Provider store={ initStore([]) }>
        <App />
    </Provider>,
    document.getElementById('root'),
);
