import React from 'react';
import '../style.css';

class Popup extends React.Component {
    render() {
        return (
            <div className='popup'>
                <div className='popup-inner'>
                    <h1>Empty task name</h1>
                    <p>You are trying close your task without name, enter the title and try again!</p>
                    <button onClick={this.props.closePopup} className = "popup-btn">close</button>
                </div>
            </div>
        );
    }
}

export default Popup;