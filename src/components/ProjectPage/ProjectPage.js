import React, { Component } from 'react';
import { connect } from 'react-redux';
import Information from './Information';
import Vacancies from './Vacancies';
import { getProject } from '../../common/ajaxRequests';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creator: false,
      project: {}
    };
  }

  componentWillMount() {
    getProject(this.props.params.project).then((project) => {
      if (!project || project === null) {
        throw new TypeError('Project not found');
      }
      this.setState({ project: project });
    })
  }

  render() {
    if (this.props.state.userData.id === +this.props.routeParams.project && this.state.creator !== true) {
      this.setState({
        creator: true
      })
    }
    if (this.props.state.userData.id !== +this.props.routeParams.project && this.state.creator !== false) {
      this.setState({
        creator: false
      })
    }
    if (this.state.project.id) {
      return (
        <div className="page row expanded">
          <div className="content row">
            <Information creator={this.state.creator} project={this.state.project} />
            <div className="space-4 small-12 columns" />
            <Vacancies creator={this.state.creator} team={this.state.project.team} />
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