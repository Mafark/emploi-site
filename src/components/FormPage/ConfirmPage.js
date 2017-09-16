import React, { Component } from 'react';
import { connect } from 'react-redux';
import { confirmToken, editUser } from '../../common/ajaxRequests';
import { browserHistory } from 'react-router';
import { userData } from '../../actionCreators';

class ConfirmPage extends Component {
  constructor(props) {
    super(props);
    this.token = this.props.location.pathname.split('confirm/')[1];
    this.state = {
      status: null
    };
  }

  componentWillMount() {
    if (this.token !== undefined) {
      let _this = this;
      confirmToken(this.token).then(function(response) {
        if (response.status === 200) {
          _this.setState({
            status: response.status
          });
        } else {
          browserHistory.push('/');
        }
        console.log(response);
      });
    } else {
      browserHistory.push('/');
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let contacts = [
      {
        name: 'Почта',
        value: this.mail.value
      },
      {
        name: 'VK',
        value: this.vk.value
      },
      {
        name: 'Телефон',
        value: this.phoneNumber.value
      },
      {
        name: 'Skype',
        value: this.skype.value
      },
      {
        name: 'Телеграм',
        value: this.telegram.value
      },
      {
        name: 'Инстаграм',
        value: this.instagram.value
      }
    ];
    this.newData = {
      name: this.name.value,
      surname: this.surname.value,
      institute: this.institute.value,
      course: parseInt(this.course.value, 10),
      direction: this.direction.value,
      aboutMe: this.aboutMe.value,
      contacts:
        contacts.filter(contact => {
          return contact.value !== '';
        }) || []
    };
    console.log(this.newData);
    editUser(this.token, this.newData).then(res => {
      console.log(res);
      this.props.updateUserData(res);
      browserHistory.push('/');
    });
  }

  render() {
    if (this.state.status === 200) {
      return (
        <div className="page row expanded">
          <div className="content row">
            <form
              id="form"
              onSubmit={this.handleSubmit.bind(this)}
              className="spec-form block shadow-3 small-12 columns">
              <div className="center">
                <h2>Для окончания регистрации заполните данные формы</h2>
              </div>
              <div className="space-2 small-12 columns" />
              <div className="form small-12 columns no-padding">
                <div className="small-12 medium-6 columns">
                  <label htmlFor="name" className="small-12 columns">
                    Имя<b>*</b>
                  </label>
                  <input
                    ref={input => (this.name = input)}
                    id="name"
                    className="small-12 columns"
                    type="text"
                    placeholder="Ваше имя"
                  />
                </div>
                <div className="small-12 medium-6 columns">
                  <label htmlFor="surname" className="small-12 columns">
                    Фамилия<b>*</b>
                  </label>
                  <input
                    ref={input => (this.surname = input)}
                    id="surname"
                    className="small-12 columns"
                    type="text"
                    placeholder="Ваша фамилия"
                    required
                  />
                </div>
                <div className="small-12 columns">
                  <label htmlFor="about" className="small-12 center columns no-padding">
                    О себе
                  </label>
                </div>
                <div className="small-12 columns center">
                  <textarea
                    ref={textarea => (this.aboutMe = textarea)}
                    id="about"
                    className="small-12 medium-12 large-12 columns"
                    maxLength="256"
                    placeholder="Расскажите чем занимаетесь"
                  />
                </div>
                <div className="small-12 medium-6 large-4 columns">
                  <label htmlFor="course" className="small-12 columns">
                    Курс<b>*</b>
                  </label>
                  <select
                    ref={select => (this.course = select)}
                    id="course"
                    className="small-12 columns"
                    type="text"
                    required>
                    <option value="1">1 курс (бакалавриат)</option>
                    <option value="2">2 курс (бакалавриат)</option>
                    <option value="3">3 курс (бакалавриат)</option>
                    <option value="4">4 курс (бакалавриат)</option>
                    <option value="5">1 курс (магистратура)</option>
                    <option value="6">2 курс (магистратура)</option>
                  </select>
                </div>
                <div className="small-12 medium-6 large-4 columns">
                  <label htmlFor="course" className="small-12 columns">
                    Институт<b>*</b>
                  </label>
                  <select
                    ref={select => (this.institute = select)}
                    id="course"
                    className="small-12 columns"
                    type="text"
                    required>
                    <option value="itasu">ИТАСУ</option>
                    <option value="inmin">ИНМИН</option>
                    <option value="ekotekh">ЭКОТЕХ</option>
                    <option value="ibo">ИБО</option>
                  </select>
                </div>
                <div className="small-12 medium-12 large-4 columns">
                  <label htmlFor="vector" className="small-12 columns">
                    Направление<b>*</b>
                  </label>
                  <input
                    ref={input => (this.direction = input)}
                    id="vector"
                    className="small-12 columns"
                    type="text"
                    placeholder="Прикладная информатика"
                    required
                  />
                </div>
                <div className="center small-12 columns">
                  <h2>Контакты</h2>
                </div>
                <div className="small-12 medium-6 large-4 columns">
                  <label htmlFor="mail" className="small-12 columns">
                    Дополнительная почта
                  </label>
                  <input
                    id="mail"
                    ref={input => (this.mail = input)}
                    className="small-12 columns"
                    type="text"
                    placeholder="k-f222@ya.ru"
                  />
                </div>
                <div className="small-12 medium-6 large-4 columns">
                  <label htmlFor="vk" className="small-12 columns">
                    Профиль вк
                  </label>
                  <input
                    ref={input => (this.vk = input)}
                    id="vk"
                    className="small-12 columns"
                    type="text"
                    placeholder="vk.com/klimf"
                  />
                </div>
                <div className="small-12 medium-6 large-4 columns">
                  <label htmlFor="phone" className="small-12 columns">
                    Телефон
                  </label>
                  <input
                    ref={input => (this.phoneNumber = input)}
                    id="phone"
                    className="small-12 columns"
                    type="text"
                    placeholder="+7 999 998 6998"
                  />
                </div>
                <div className="small-12 medium-6 large-4 columns">
                  <label htmlFor="skype" className="small-12 columns">
                    Скайп
                  </label>
                  <input
                    ref={input => (this.skype = input)}
                    id="skype"
                    className="small-12 columns"
                    type="text"
                    placeholder="k-f222"
                  />
                </div>
                <div className="small-12 medium-6 large-4 columns">
                  <label htmlFor="telegram" className="small-12 columns">
                    Телеграм
                  </label>
                  <input
                    ref={input => (this.telegram = input)}
                    id="telegram"
                    className="small-12 columns"
                    type="text"
                    placeholder="klimfl"
                  />
                </div>
                <div className="small-12 medium-6 large-4 columns">
                  <label htmlFor="instagram" className="small-12 columns">
                    Инстаграм
                  </label>
                  <input
                    ref={input => (this.instagram = input)}
                    id="instagram"
                    className="small-12 columns"
                    type="text"
                    placeholder="klimfl"
                  />
                </div>
                <div className="space-2 small-12 columns" />
                <div className="space-3 small-0 medium-6 large-8 columns" />
                <div className="small-12 medium-6 large-4 columns">
                  <input
                    id="submit"
                    className="small-bg overflow-ellipsis small-12 columns"
                    type="submit"
                    defaultValue="Отправить"
                  />
                </div>
                <div className="space-2 small-12 columns" />
              </div>
            </form>
            <div className="space-4 small-12 columns" />
            <div className="space-4 small-12 columns" />
          </div>
        </div>
      );
    } else {
      return <h1>LOADING....</h1>;
    }
  }
}

export default connect(
  state => ({
    state: state
  }),
  dispatch => ({
    updateUserData(data) {
      dispatch(userData.updateUser(data));
    }
  })
)(ConfirmPage);
