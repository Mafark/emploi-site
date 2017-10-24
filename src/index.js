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
import EditProjectPage from './components/ProjectPage/EditProjectPage';
import EditVacancyPage from './components/ProjectPage/EditVacancyPage';
import ApplyToVacancyByToken from './components/ProjectPage/ApplyToVacancyByToken';
import ConfirmPage from './components/FormPage/ConfirmPage';
import StudentsSearcherPage from './components/SearchPage/StudentsSearcher';
import ProjectsSearcherPage from './components/SearchPage/ProjectsSearcher';
import NotFound from './components/NotFound';
// store.subscribe(()=>{
//     console.log(store.getState())
// })

ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="confirm" component={ConfirmPage}>
          <Route path=":params" />
        </Route>
        <Route path="projects" component={ProjectsSearcherPage} />
        <Route path="students" component={StudentsSearcherPage} />
        <Route path="users/:user" component={UserPage} />
        <Route path="profile" component={ProfilePage} />
        <Route path="projects/:project" component={ProjectPage} />
        <Route path="projects/:project/edit" mode="edit" component={EditProjectPage} />
        <Route path="project/create" mode="create" component={EditProjectPage} />
        <Route path="projects/:project/vacancy/:vacancy/edit" mode="edit" component={EditVacancyPage} />
        <Route path="projects/:project/vacancy/create" mode="create" component={EditVacancyPage} />
        <Route path="apply/vacancy/:token" component={ApplyToVacancyByToken} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
