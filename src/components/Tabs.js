import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import { withRouter } from 'react-router-dom';
import { history as historyPropTypes } from 'history-prop-types';
import PropTypes from 'prop-types';

function NavTabs(props) {
  const handleChangeTab = (e, value) => {
    const { history } = props;
    history.push(value);
  };
  return (
    <AppBar position="static">
      <Tabs
        value={location.pathname === '/timer/tasks' ? 'tasks' : 'graphics'}
        centered
        variant="fullWidth"
        onChange={handleChangeTab}
      >
        <Tab label="Task Log" value="tasks" />
        <Tab label="Tasks Chart" value="graphics" />
      </Tabs>
    </AppBar>
  );
}

NavTabs.propTypes = {
  history: PropTypes.shape(historyPropTypes).isRequired,
};

export default withRouter(NavTabs);
