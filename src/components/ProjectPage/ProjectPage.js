import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Information from './Information';
import Vacancies from './Vacancies';
import { getProject, deleteProject as delProject } from '../../common/ajaxRequests';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.projectID = +this.props.params.project;
    this.state = {
      creator: false,
      project: {}
    };
  }

  componentWillMount() {
    getProject(this.projectID).then((project) => {
      if (!project || project === null) {
        throw new TypeError('Project not found');
      }
      this.setState({ project: project });
    })
  }

  deleteProject() {
    delProject(this.projectID);
    browserHistory.push('/');
  }

  render() {
    if (this.state.project.id) {
      if (this.props.state.userData.id === this.state.project.leader.id && this.state.creator !== true) {
        this.setState({
          creator: true
        })
      }
      if (this.props.state.userData.id !== this.state.project.leader.id && this.state.creator !== false) {
        this.setState({
          creator: false
        })
      }
      return (
        <div className="page row expanded">
          {
            this.state.creator ?
              <div>
                <Link to={this.props.location.pathname + '/edit'} style={{ fontSize: '40px', color: 'red' }}>EDIT</Link>
                <button onClick={this.deleteProject.bind(this)} style={{ fontSize: '40px', color: 'red' }}>DELETE PROJECT</button>
              </div>
              :
              null
          }
          <div className="content row">
            <Information creator={this.state.creator} project={this.state.project} />
            <div className="space-4 small-12 columns" />
            <Vacancies creator={this.state.creator} projectID={this.projectID} team={this.state.project.team} />
            <div className="space-4 small-12 columns" />
            <br />
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <span className="preloader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </span>
        </div>
      )
    }
  }
}

export default connect(
  state => ({
    state: state
  })
)(ProfilePage);