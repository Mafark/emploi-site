import React, { Component } from 'react';
import { Link } from 'react-router';
import { site, deleteVacancy as delVacancy, unassignToVacancy as delMember } from '../../common/ajaxRequests';

class Vacancies extends Component {
  deleteVacancy(vacancyID) {
    delVacancy(this.props.projectID, vacancyID);
  }

  deleteMember(vacancyID) {
    delMember(this.props.projectID, vacancyID);
  }

  render() {
    return (
      <div className="small-12 center columns no-padding">
        <div className="projects transition small-12 medium-12 large-10">
          {
            this.props.team !== 0 && this.props.team ?
              <span>
                <h2 className="small-12 text-center columns">Команда</h2>
                <div className="space-2 small-12 columns" />
                {
                  this.props.team.map((unit, index) => {
                    return (
                      unit.member !== undefined ?
                        <div key={index} className="block project shadow-1 small-12 columns row">
                          {
                            this.props.creator ?
                              <div>
                                <button style={{ color: 'red' }} onClick={this.deleteVacancy.bind(this, unit.id)}>DELETE VACANCY</button>
                                <button style={{ color: 'red' }}>EDIT VACANCY</button>
                              </div>
                              :
                              null
                          }
                          <div className="small-12 columns">
                            <h2 className="small-12 medium-6 nowrap no-padding columns">{unit.profession}</h2>
                            <Link to={site + '/users/' + unit.member.id} className="small-12 medium-6 nowrap no-padding columns">{unit.member.name + ' ' + unit.member.surname}</Link>
                            {
                              this.props.creator ?
                                <div style={{ color: 'red' }} onClick={this.deleteMember.bind(this, unit.id)}>delete member</div>
                                :
                                null
                            }
                          </div>
                          <div className="small-12 columns">
                            <p>{unit.description}</p>
                          </div>
                          <div className="small-12 columns">
                            {
                              unit.tags.map((tag, index) => {
                                return <div key={index} className="tag circle small-bg">{tag}</div>
                              })
                            }
                          </div>
                        </div>
                        :
                        <div key={index} className="block project shadow-1 small-12 columns row border-dashed transparent no-shadow">
                          {
                            this.props.creator ?
                              <div>
                                <button style={{ color: 'red' }} onClick={this.deleteVacancy.bind(this, unit.id)}>DELETE VACANCY</button>
                                <button style={{ color: 'red' }}>EDIT VACANCY</button>
                              </div>
                              :
                              null
                          }
                          <div className="small-12 columns">
                            <h2 className="small-12 medium-6 nowrap no-padding columns">{unit.profession}</h2>
                            <a href="#" className="small-12 medium-6 nowrap no-padding columns">Нажмите чтобы занять место</a>
                          </div>
                          <div className="small-12 columns">
                            <p>{unit.description}</p>
                          </div>
                          <div className="small-12 columns">
                            {
                              unit.tags.map((tag, index) => {
                                return <div key={index} className="tag circle small-bg">{tag}</div>
                              })
                            }
                          </div>
                        </div>
                    )
                  })
                }
              </span>
              :
              null
          }
        </div>
      </div>
    )
  }
}

export default Vacancies;