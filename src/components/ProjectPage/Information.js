import React, { Component } from 'react';
import { Link } from 'react-router';
import { site } from '../../common/ajaxRequests';

class Information extends Component {
  render() {
    return (
      <div className="block wide shadow-1 small-12 columns row">
        {/* {this.props.creator ? (
          <div className="small-12 columns">
            <span className="right">
              <button className="icon-link" onClick={this.props.deleteProject.bind(this)}>
                <i className="material-icons">close</i>
              </button>
              <Link className="icon-link" to={this.props.location.pathname + '/edit'}>
                <i className="material-icons">edit</i>
              </Link>
            </span>
          </div>
        ) : null} */}
        <div className="space-1 small-3 medium-rm large-rm columns" />
        <div className="small-12 medium-12 large-padding-left-3 columns">
          <div className="small-12 medium-4 padding-right-3 columns small-no-padding">
            <div className="space-1 small-2 medium-rm large-rm columns" />
            <img
              src={this.props.project.avatar}
              className="small-8 medium-12 border columns no-padding margin-bottom"
              alt="LOD"
            />
            <div className="space-1 small-2 medium-rm large-rm columns" />
          </div>
          <div className="small-12 medium-8 large-padding-left-3 columns no-padding">
            <h2 className="small-12 full-name small-text-center no-margin no-padding columns">
              {this.props.project.name}
            </h2>
            <Link
              to={site + '/users/' + this.props.project.leader.id}
              className="small-12 small-text-center no-padding columns">
              {this.props.project.leader.name + ' ' + this.props.project.leader.surname}
            </Link>
          </div>
          <div className="space-2 small-12 medium-8 columns" />
          <p>
            {this.props.project.description}
            <br />
            {this.props.project.tags.map((tag, index) => {
              return (
                <div key={index} className="tag circle small-bg">
                  {tag}
                </div>
              );
            })}
          </p>
          <div className="small-12 medium-8 columns no-padding" />
        </div>
      </div>
    );
  }
}

export default Information;
