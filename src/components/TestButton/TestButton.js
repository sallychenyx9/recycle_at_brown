import React from 'react';
import './TestButton.css';

const testButton = props => {
    return(
        <button className = 'test-button' onClick = {props.handler}>Click me for test!</button>
    )
}

export default testButton;