import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const ButtonTimer = ({ onClick, children, style }) => {
  return (
    <Button variant="contained" onClick={onClick} style={style}>
      {children}
    </Button>
  );
};

ButtonTimer.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

ButtonTimer.defaultProps = {
  style: null,
  onClick: null,
};

export default ButtonTimer;
