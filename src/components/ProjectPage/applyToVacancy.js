import React, { Component } from 'react';
import { Link } from 'react-router';
import { applyToVacancyByToken } from '../../common/ajaxRequests';

class ApplyToVacancy extends Component {
  constructor(props) {
    super(props);
    this.inviteToken = this.props.params.token;
    this.state = {
      loaded: false,
      applyToVacancyOK: false
    };
  }

  componentWillMount() {
    console.log(this.inviteToken);
    applyToVacancyByToken(this.inviteToken).then(response => {
      this.setState({
        loaded: true
      });
      if (response.status === 200) {
        this.setState({
          applyToVacancyOK: true
        });
      }
    });
  }

  render() {
    if (this.state.loaded) {
      return (
        <div>
          {this.state.applyToVacancyOK ? <div>Вы заняли вакансию.</div> : <div>Вакансия уже занята.</div>}
          <div>Вы будете перенаправлены на главную страницу через 5 секунд.</div>
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

export default ApplyToVacancy;
