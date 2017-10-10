import React, { Component } from 'react';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';
import {
  getStudentsSearchDataByPage,
  getProjectsSearchDataByPage,
  inviteToVacancy
} from '../../common/ajaxRequests';
import { Link } from 'react-router';

class DataResults extends Component {
  constructor(props) {
    super(props);
    this.page = 1;
    this.numberOfDataInPage = 10;
    this.searchForVacancy =
      this.props.dataForVacancy &&
      this.props.userData.portfolio.filter(project => {
        return parseInt(this.props.dataForVacancy.project) === project.id;
      }).length !== 0;
  }

  getNextPage() {
    if (this.props.location === '/students') {
      this.props.state.search.searchData.length > this.numberOfDataInPage &&
      this.props.state.search.searchData.length % this.numberOfDataInPage === 0
        ? (this.page = this.props.state.search.searchData.length / this.numberOfDataInPage)
        : null;
      getStudentsSearchDataByPage(this.page);
    } else if (this.props.location === '/projects') {
      this.props.state.search.searchData.length > this.numberOfDataInPage &&
      this.props.state.search.searchData.length % this.numberOfDataInPage === 0
        ? (this.page = this.props.state.search.searchData.length / this.numberOfDataInPage)
        : null;
      getProjectsSearchDataByPage(this.page);
    }
  }

  sendInvite(user, e) {
    e.preventDefault();
    e.currentTarget.children[0].innerHTML = '&#xE876;';
    inviteToVacancy(this.props.dataForVacancy.project, this.props.dataForVacancy.vacancy, user.id);
  }

  render() {
    if (this.props.location === '/students') {
      return (
        <div className="search-units block shadow-1 small-12 columns">
          {this.props.state.search.searchData.length === 0 ? (
            <div className="color-grey center">Здесь будут результаты поиска</div>
          ) : null}
          {this.props.state.search.searchData.map((item, index) => {
            return (
              <div key={index}>
                <Link to={'/users/' + item.id} className="search-unit small-12 columns">
                  <img
                    src={item.avatar}
                    alt={item.name + ' ' + item.surname}
                    className="medium-img circle border"
                  />
                  <div className="small-12 columns">
                    <p>
                      {item.name + ' ' + item.surname}
                      {this.searchForVacancy ? (
                        <div className="inline right nowrap">
                          <span className="right">
                            <button
                              className="icon-link icon-link__small"
                              onClick={this.sendInvite.bind(this, item)}>
                              <i className="material-icons">&#xE7FE;</i>
                            </button>
                          </span>
                        </div>
                      ) : null}
                    </p>
                    {item.tags.map((tag, index) => {
                      return (
                        <div key={index} className="tag circle small-bg">
                          {tag}
                        </div>
                      );
                    })}
                  </div>
                </Link>
                <hr />
              </div>
            );
          })}
          <Waypoint onEnter={this.getNextPage.bind(this)} />
        </div>
      );
    } else if (this.props.location === '/projects') {
      return (
        <div>
          <div className="block wide shadow-1 small-12 columns row">
            {this.props.state.search.searchData.length === 0 ? (
              <div className="color-grey center">Здесь будут результаты поиска</div>
            ) : null}
            {this.props.state.search.searchData.map((project, index) => {
              return (
                <Link to={'/projects/' + project.id} key={index}>
                  <div className="space-1 small-3 medium-rm large-rm columns" />
                  <div className="small-12 medium-12 large-padding-left-3 columns">
                    <p>
                      <div className="small-12 medium-4 padding-right-3 columns small-no-padding">
                        <div className="space-1 small-2 medium-rm large-rm columns" />
                        <img
                          src={project.avatar}
                          className="small-8 medium-12 border columns no-padding margin-bottom"
                          alt="LOD"
                        />
                        <div className="space-1 small-2 medium-rm large-rm columns" />
                      </div>
                      <div className="small-12 medium-8 large-padding-left-3 columns no-padding">
                        <h2 className="text-black small-12 full-name small-text-center no-margin no-padding columns">
                          {project.name}
                        </h2>
                        <Link
                          to={'/users/' + project.leader.id}
                          className="small-12 small-text-center no-padding columns">
                          {project.leader.name + ' ' + project.leader.surname}
                        </Link>
                      </div>
                      <div className="text-black space-2 small-12 medium-8 columns" />
                      <p className="text-black">{project.description}</p>
                    </p>
                  </div>
                  <hr />
                  <div className="space-2 small-12 columns" />
                  <div className="small-12 large-padding-left-3 columns">
                    {project.tags.map((tag, index) => {
                      return (
                        <div key={index} className="tag circle small-bg">
                          {tag}
                        </div>
                      );
                    })}
                  </div>
                  <div className="small-12 columns no-padding">
                    {project.team.map((unit, index) => {
                      return unit.member ? (
                        <div
                          key={index}
                          className="member small-6 medium-6 large-4 large-padding-left-3 columns end">
                          <p className="role text-black">{unit.profession}</p>
                          <Link to={'/users/' + unit.member.id} className="name">
                            {unit.member.name + ' ' + unit.member.surname}
                          </Link>
                        </div>
                      ) : null;
                    })}
                  </div>
                </Link>
              );
            })}
            <Waypoint onEnter={this.getNextPage.bind(this)} />
          </div>
        </div>
      );
    }
  }
}

export default connect(state => ({
  state: state
}))(DataResults);
