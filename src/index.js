import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App';
import HomePage from './components/HomePage/HomePage';
import UserPage from './components/User/UserPage';
import ProfilePage from './components/User/ProfilePage';
import ProjectPage from './components/ProjectPage/ProjectPage';
import CreateProjectPage from './components/ProjectPage/CreateProjectPage';
import ConfirmPage from './components/FormPage/ConfirmPage';
import StudentsSearcherPage from './components/SearchPage/StudentsSearcher';
import ProjectsSearcherPage from './components/SearchPage/ProjectsSearcher';
import NotFound from './components/NotFound';
// store.subscribe(()=>{
//     console.log(store.getState())
// })

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={HomePage} />
        <Route path='confirm' component={ConfirmPage}>
          <Route path=':params' />
        </Route>
        <Route path='projects' component={ProjectsSearcherPage} />
        <Route path='students' component={StudentsSearcherPage} />
        <Route path='users/:user' component={UserPage} />
        <Route path='profile' component={ProfilePage} />
        <Route path='projects/:project' component={ProjectPage} />
        <Route path='project/add' component={CreateProjectPage} />
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);