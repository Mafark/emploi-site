import React, { Component } from 'react';
import { Link } from 'react-router';
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

  preloader(value) {
    this.setState({
      preloader: value
    });
  }

  render() {
    return (
      <div className="small-12 center columns no-padding">
        <div className="projects transition small-12 medium-12 large-10">
          {this.props.team !== 0 && this.props.team
            ? <span>
                <h2 className="small-12 text-center columns">Команда</h2>
                <div className="space-2 small-12 columns" />
                {this.state.team.map((unit, index) => {
                  return unit.member
                    ? <div key={index} className="block project shadow-1 small-12 columns row">
                        {this.props.creator
                          ? <div>
                              <button style={{ color: 'red' }} onClick={this.deleteVacancy.bind(this, unit)}>
                                DELETE VACANCY
                              </button>
                              <Link
                                to={'/projects/' + this.projectID + '/vacancy/' + unit.id + '/edit'}
                                style={{ color: 'red' }}>
                                EDIT VACANCY
                              </Link>
                            </div>
                          : null}
                        <div className="small-12 columns">
                          <h2 className="small-12 medium-6 nowrap no-padding columns">
                            {unit.profession}
                          </h2>
                          <Link
                            to={site + '/users/' + unit.member.id}
                            className="small-12 medium-6 nowrap no-padding columns">
                            {unit.member.name + ' ' + unit.member.surname}
                          </Link>
                          {this.props.creator
                            ? <div style={{ color: 'red' }} onClick={this.deleteMember.bind(this, unit)}>
                                delete member
                              </div>
                            : null}
                        </div>
                        <div className="small-12 columns">
                          <p>
                            {unit.description}
                          </p>
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
                    : <div
                        key={index}
                        className="block project shadow-1 small-12 columns row border-dashed transparent no-shadow">
                        {this.props.creator
                          ? <div>
                              <button style={{ color: 'red' }} onClick={this.deleteVacancy.bind(this, unit)}>
                                DELETE VACANCY
                              </button>
                              <Link
                                to={'/projects/' + this.projectID + '/vacancy/' + unit.id + '/edit'}
                                style={{ color: 'red' }}>
                                EDIT VACANCY
                              </Link>
                            </div>
                          : null}
                        <div className="small-12 columns">
                          <h2 className="small-12 medium-6 nowrap no-padding columns">
                            {unit.profession}
                          </h2>
                          <a href="#" className="small-12 medium-6 nowrap no-padding columns">
                            Нажмите чтобы занять место
                          </a>
                          {this.props.creator
                            ? <div>
                                {this.state.preloader ? <div>ПРЕЛОАДЕР</div> : null}
                                <button
                                  style={{ color: 'red' }}
                                  onClick={this.generateLink.bind(this, unit.id)}>
                                  Сгенерировать ссылку
                                </button>
                                <input value={unit.vacancyLink} type="text" />
                              </div>
                            : null}
                        </div>
                        <div className="small-12 columns">
                          <p>
                            {unit.description}
                          </p>
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
                      </div>;
                })}
                {this.props.creator
                  ? <Link to={'/projects/' + this.projectID + '/vacancy/create'} style={{ color: 'red' }}>
                      ADD VACANCY
                    </Link>
                  : null}
              </span>
            : null}
        </div>
      </div>
    );
  }
}

export default Vacancies;
