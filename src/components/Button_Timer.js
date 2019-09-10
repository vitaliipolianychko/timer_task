import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    border: '2px solid grey',
    borderRadius: 3,
    color: '#00B4B4',
    background: 'white',
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: 700,
    marginLeft : 65,
  },
});

const ButtonTimer = ({ onClick, children, style }) => {
  const classes = useStyles();
  return (
    <Button className={classes.root} onClick={onClick}>
      {children}
    </Button>
  );
};
export default ButtonTimer;
