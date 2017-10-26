import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import {
  site,
  deleteVacancy as delVacancy,
  unassignToVacancy as delMember,
  getVacancyLink,
  applyToVacancy
} from '../../common/ajaxRequests';

class Vacancies extends Component {
  constructor(props) {
    super(props);
    this.projectID = this.props.projectID;
    this.state = {
      team: {},
      vacancyLink: '',
      preloader: false
    };
  }
  componentWillMount() {
    let newTeam = this.props.team;
    newTeam.sort((a, b) => {
      if (!a.member && b.member) {
        return 1;
      } else {
        return -1;
      }
    });
    newTeam.forEach(function(vacancy) {
      vacancy.vacancyLink = '';
    });
    this.setState({
      team: newTeam
    });
  }

  deleteVacancy(vacancy) {
    this.props.deleteVacancy(vacancy);
    delVacancy(this.projectID, vacancy.id);
  }

  deleteMember(vacancy) {
    this.props.deleteMember(vacancy.id);
    delMember(this.projectID, vacancy.id);
  }

  generateLink(vacancyID) {
    this.preloader(true);
    getVacancyLink(this.projectID, vacancyID).then(response => {
      let newTeam = this.state.team.map(function(vacancy) {
        if (vacancy.id == vacancyID) {
          vacancy.vacancyLink = 'http:' + site + '/apply/vacancy/' + response.vacancyToken;
        }
      });
      response.vacancyToken
        ? this.setState({
            vacancyLink: newTeam
          })
        : null;
      this.preloader(false);
    });
  }

  handleApplyToVacancy(vacancy) {
    let message = prompt('Вы хотите занять эту вакансию. Напишите комментарий к письму.', '');
    applyToVacancy(this.projectID, vacancy.id, message);
  }

  handleSearchForJob(vacancy) {
    browserHistory.push('/');
  }

  preloader(value) {
    this.setState({
      preloader: value
    });
  }

  render() {
    return (
      <div className="small-12 center columns no-padding">
        <div className="projects transition small-12 medium-12 large-10">
          {this.props.team !== 0 && this.props.team ? (
            <span>
              <h2 className="small-12 text-center columns">
                Команда{' '}
                {this.props.creator ? (
                  <Link to={'/projects/' + this.projectID + '/vacancy/create'}>
                    <button className="icon-link icon-link__small">+</button>
                  </Link>
                ) : null}
              </h2>
              <div className="space-2 small-12 columns" />
              {this.state.team.map((unit, index) => {
                return unit.member ? (
                  <div
                    key={index}
                    className="block project shadow-1 small-12 columns row border-solid transparent no-shadow">
                    <div className="small-12 columns">
                      <div className="">
                        {this.props.creator ? (
                          <div className="inline right nowrap">
                            <span className="right">
                              <button className="icon-link" onClick={this.deleteVacancy.bind(this, unit)}>
                                <i className="material-icons">delete</i>
                              </button>
                              <Link
                                className="icon-link"
                                to={'/projects/' + this.projectID + '/vacancy/' + unit.id + '/edit'}>
                                <i className="material-icons">edit</i>
                              </Link>
                            </span>
                          </div>
                        ) : null}
                        <h2 className=" no-padding left">{unit.profession}</h2>
                      </div>
                      <Link
                        to={site + '/users/' + unit.member.id}
                        className="small-12 medium-12 nowrap no-padding columns text-left">
                        {unit.member.name + ' ' + unit.member.surname}
                        {this.props.creator ? (
                          <span
                            className="icon-link icon-link__small inline"
                            onClick={this.deleteMember.bind(this, unit)}>
                            Снять
                          </span>
                        ) : null}
                      </Link>
                    </div>
                    <div className="small-12 columns">
                      <p>{unit.description}</p>
                    </div>
                    <div className="small-12 columns">
                      {unit.tags.map((tag, index) => {
                        return (
                          <div key={index} className="tag circle small-bg">
                            {tag}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div
                    key={index}
                    className="block project shadow-1 small-12 columns row border-dashed transparent no-shadow">
                    <div className="small-12 columns">
                      {this.props.creator ? (
                        <div className="inline right nowrap">
                          <span className="right">
                            <button className="icon-link" onClick={this.deleteVacancy.bind(this, unit)}>
                              <i className="material-icons">delete</i>
                            </button>
                            <Link
                              className="icon-link"
                              to={'/projects/' + this.projectID + '/vacancy/' + unit.id + '/edit'}>
                              <i className="material-icons">edit</i>
                            </Link>
                          </span>
                        </div>
                      ) : null}
                      {this.props.user.id && !this.props.creator ? (
                        <div className="inline right nowrap">
                          <span className="right">
                            <button
                              className="icon-link"
                              onClick={this.handleApplyToVacancy.bind(this, unit)}>
                              <i className="material-icons">input</i>
                            </button>
                          </span>
                        </div>
                      ) : null}
                      <h2 className="no-padding left">{unit.profession}</h2>
                      {/* <a href="#" className="small-12 medium-6 nowrap no-padding columns">
                            Нажмите чтобы занять место
                          </a> */}
                    </div>
                    {this.props.creator ? (
                      <div className="small-12 columns">
                        <div className="space-2 small-12 medium-rm large-rm columns" />
                        {this.state.preloader ? <div>ПРЕЛОАДЕР</div> : null}
                        <input
                          className="small-12 medium-7 large-7 columns"
                          value={unit.vacancyLink}
                          placeholder="Получить ссылку на вакансию"
                          type="text"
                        />
                        <div className="inline right small-12 medium-5 large-5">
                          <button
                            className="icon-link left icon-link_no-top"
                            onClick={this.generateLink.bind(this, unit.id)}>
                            <i className="material-icons">link</i>
                          </button>
                          <Link
                            to={{
                              pathname: '/students',
                              query: { project: this.projectID, vacancy: unit.id, tags: [unit.tags] }
                            }}
                            className="icon-link right icon-link_no-top">
                            Пригласить
                          </Link>
                        </div>
                      </div>
                    ) : null}
                    <div className="small-12 columns">
                      <p>{unit.description}</p>
                    </div>
                    <div className="small-12 columns">
                      {unit.tags.map((tag, index) => {
                        return (
                          <div key={index} className="tag circle small-bg">
                            {tag}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </span>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Vacancies;
