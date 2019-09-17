import React from 'react';
import '../style.css';
import PropTypes from 'prop-types';

const Popup = props => {
  const { closePopup } = props;
  return (
    <div className="popup">
      <div className="popup-inner">
        <h1>Empty task name</h1>
        <p>You are trying close your task without name, enter the title and try again!</p>
        <button type="button" onClick={closePopup} className="popup-btn">
          Close
        </button>
      </div>
    </div>
  );
};

Popup.propTypes = {
  closePopup: PropTypes.func.isRequired,
};

export default Popup;
