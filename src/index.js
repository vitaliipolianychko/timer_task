import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/storeRedux';
import ChartContainer from './components/Chart/ChartContainer';
import TaskContainer from './components/Task/TaskContainer';
import TasksLog from './components/tasksLog';

export const renderTasks = state => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter basename="/timer/">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/tasks" />} />
          <Route exact path="/tasks" component={TasksLog} />
          <Route exact path="/tasks/:id" component={TaskContainer} />
          <Route exact path="/graphics" component={ChartContainer} />
        </Switch>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
};
renderTasks(store.getState());
store.subscribe(() => {
  renderTasks(store.getState());
});
