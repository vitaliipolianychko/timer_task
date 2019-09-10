import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import {withRouter} from 'react-router-dom';


  function NavTabs(props) {
  const handleChangeTab = (e, value) => {
    const { history } = props;
    history.push(value);
  };
  return (
    <AppBar position="static">
      <Tabs
        value={location.pathname === '/tasks' ? 'tasks' : 'graphics'}
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
export default withRouter(NavTabs);
