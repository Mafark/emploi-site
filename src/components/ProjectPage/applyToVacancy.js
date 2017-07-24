import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { applyToVacancyByToken } from '../../common/ajaxRequests';

class ApplyToVacancy extends Component {
  constructor(props) {
    super(props);
    this.inviteToken = this.props.params.token;
    this.state = {
      loaded: false,
      applyMessage: ''
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
          applyMessage: 'Вы заняли вакансию.'
        });
      } else if (response.status === 401) {
        this.setState({
          applyMessage: 'Вы не авторизованы, авторизуйтесь и попробуйте заного.'
        });
      } else if (response.status === 404) {
        this.setState({
          applyMessage: 'Не верный токен. Попросите админа проекта сгенерировать ссылку снова.'
        });
      }
      setTimeout(function() {
        browserHistory.push('/profile/');
      }, 10000);
    });
  }

  render() {
    if (this.state.loaded) {
      return (
        <div>
          {this.state.applyMessage}
          <div>Вы будете перенаправлены на главную страницу через 10 секунд.</div>
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
