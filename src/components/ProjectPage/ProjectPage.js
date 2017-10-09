import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Information from './Information';
import Vacancies from './Vacancies';
import { getProject, deleteProject as delProject, getCurrentUser } from '../../common/ajaxRequests';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.projectID = +this.props.params.project;
    this.state = {
      creator: false,
      project: {},
      projectPreloader: false
    };
  }

  componentWillMount() {
    getProject(this.projectID).then(project => {
      if (!project || project === null) {
        throw new TypeError('Project not found');
      }
      this.setState({ project: project });
    });
  }

  deleteProject() {
    this.preloader(true, 'projectPreloader');
    delProject(this.projectID).then(response => {
      getCurrentUser().then(() => {
        this.preloader(false, 'projectPreloader');
        browserHistory.push('/profile');
      });
    });
  }

  preloader(value, preloader) {
    this.setState({
      preloader: value
    });
  }

  deleteVacancy(vacancy) {
    let newProject = Object.assign({}, this.state.project);
    newProject.team.splice(newProject.team.indexOf(vacancy), 1);
    this.setState({
      project: newProject
    });
  }

  deleteMember(vacancyID, member) {
    let newProject = Object.assign({}, this.state.project);
    newProject.team[vacancyID].member = null;
    this.setState({
      project: newProject
    });
  }

  render() {
    if (this.state.project.id) {
      if (this.props.state.userData.id === this.state.project.leader.id && this.state.creator !== true) {
        this.setState({
          creator: true
        });
      }
      if (this.props.state.userData.id !== this.state.project.leader.id && this.state.creator !== false) {
        this.setState({
          creator: false
        });
      }
      return (
        <div className="page row expanded">
          {this.state.preloader ? <div>ПРЕЛОАДЕР</div> : null}
          <div className="content row">
            <Information
              creator={this.state.creator}
              deleteProject={this.deleteProject}
              project={this.state.project}
              location={this.props.location}
            />
            <div className="space-4 small-12 columns" />
            <Vacancies
              user={this.props.state.userData}
              creator={this.state.creator}
              projectID={this.projectID}
              team={this.state.project.team}
              deleteVacancy={this.deleteVacancy.bind(this)}
              deleteMember={this.deleteMember.bind(this)}
            />
            <div className="space-4 small-12 columns" />
            <br />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <span className="preloader">
            <div />
            <div />
            <div />
            <div />
          </span>
        </div>
      );
    }
  }
}

export default connect(state => ({
  state: state
}))(ProfilePage);
