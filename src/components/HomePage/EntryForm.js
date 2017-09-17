import React, { Component } from 'react';
import { preRegistration, authorization } from '../../common/ajaxRequests';
import { connect } from 'react-redux';
import { homePage } from '../../actionCreators';

class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regMessage: false
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.state.homePage.regBlockIsOpen ? this.registration() : this.authorization();
  }

  registration() {
    if (this.pass.value === this.pass2.value) {
      this.closeRegistrationBlock();
      document.getElementById('message').innerHTML = '';
      this.setState({
        regMessage: true
      });
      preRegistration(this.mail.value, this.pass.value);
    } else {
      document.getElementById('message').innerHTML = '*Пароли не совпадают';
    }
  }

  authorization() {
    authorization(this.mail.value, this.pass.value);
  }

  openRegistrationBlock() {
    this.props.changeRegBlockState(true);
  }

  closeRegistrationBlock() {
    this.props.changeRegBlockState(false);
  }

  disableRegMessage() {
    this.setState({
      regMessage: false
    });
  }

  render() {
    if (!this.state.regMessage) {
      return (
        <form
          onSubmit={this.handleSubmit.bind(this)}
          id="entry"
          className={`${this.props.state.homePage.regBlockIsOpen
            ? 'medium-12 large-12'
            : 'medium-6 large-5'} entry block shadow-3 small-12 columns`}>
          <a
            onClick={this.closeRegistrationBlock.bind(this)}
            id="sign-in"
            className={`${this.props.state.homePage.regBlockIsOpen
              ? ''
              : 'disabled-link'} sign-in-a small-6 columns text-left`}>
            Вход
          </a>
          <a
            onClick={this.openRegistrationBlock.bind(this)}
            id="sign-up"
            className={`${this.props.state.homePage.regBlockIsOpen
              ? 'disabled-link'
              : ''} sign-up-a small-6 columns text-right`}>
            Регистрация
          </a>
          <div className="space-2 small-12 columns" />
          <input
            id="vk-btn"
            className="overflow-ellipsis small-12 small-bg columns"
            defaultValue={
              this.props.state.homePage.regBlockIsOpen ? (
                'Зарегистрироваться через Вконтакте'
              ) : (
                'Войти через Вконтакте'
              )
            }
            type="button"
          />
          <div className="space-2 small-12 columns" />
          <div className="small-4 line columns" />
          <p className="small-4 text-center columns">Или</p>
          <div className="small-4 line columns" />
          <div className="space-2 small-12 columns" />
          <div id="entry-form" className="form small-12 columns no-padding">
            <label
              htmlFor="email"
              className={`${this.props.state.homePage.regBlockIsOpen
                ? ''
                : 'all-0 hide'} entry-label small-12 medium-3 large-2 columns`}>
              E-mail
            </label>
            <input
              ref={input => {
                this.mail = input;
              }}
              id="email"
              className={`${this.props.state.homePage.regBlockIsOpen
                ? 'medium-9 large-10'
                : ''} entry-input small-12 columns`}
              type="text"
              pattern="^[_]*([a-z0-9]+(\.|_*)?)+@([a-z][a-z0-9-]+(\.|-*\.))+[a-z]{2,6}$"
              placeholder="Почта"
            />
            <label
              htmlFor="password2"
              className={`${this.props.state.homePage.regBlockIsOpen
                ? ''
                : 'all-0 hide'} entry-label  small-12 medium-3 large-2 columns`}>
              Пароль
            </label>
            <input
              ref={input => {
                this.pass2 = input;
              }}
              id="password2"
              className={`${this.props.state.homePage.regBlockIsOpen
                ? 'medium-9 large-4'
                : 'all-0 hide'} entry-input entry-input-hide small-12 columns`}
              type="password"
              pattern="^.{6,}$"
              placeholder="Введите пароль"
            />
            <label
              htmlFor="password"
              className={`${this.props.state.homePage.regBlockIsOpen
                ? ''
                : 'all-0 hide'} entry-label small-12 medium-3 large-2 columns`}>
              Еще раз
            </label>
            <input
              ref={input => {
                this.pass = input;
              }}
              id="password"
              className={`${this.props.state.homePage.regBlockIsOpen
                ? 'medium-9 large-4'
                : ''} entry-input small-12 columns`}
              type="password"
              pattern="^.{6,}$"
              placeholder="Пароль"
              required
            />
            <div className="space-2 small-0 small-12 columns" />
            <div id="message" className="left" />
            <div
              className={`${this.props.state.homePage.regBlockIsOpen
                ? 'hide remove'
                : ''} check small-12 medium-6 large-8 columns`}>
              <input id="check" name="check" type="checkbox" defaultChecked />
              <label htmlFor="check"> Запомнить </label>
            </div>
            <input
              id="submit"
              className="overflow-ellipsis small-12 medium-6 large-4 small-bg columns"
              type="submit"
              defaultValue={this.props.state.homePage.regBlockIsOpen ? 'Зарегистрироваться' : 'Войти'}
            />
          </div>
          <div className="space-2 small-12 columns" />
          <a
            href="#"
            className={`${this.props.state.homePage.regBlockIsOpen
              ? 'hide all-0'
              : ''} reg-rm transition overflow-ellipsis small-12 columns text-right`}>
            Забыли пароль?
          </a>
        </form>
      );
    } else {
      return (
        <div className="entry block shadow-3 small-12 medium-6 large-5 columns">
          <div className="small-12 text-center columns no-padding">
            <div className="space-3 small-12 columns" />
            <h2 className="text-center small-12 columns no-padding light">Спасибо за регистрацию!</h2>
            <div className="space-2 small-12 columns" />
            <p className="text-center small-12 columns no-padding light">
              Мы отправили вам письмо, пожалуйста зайдите на почту и перейдите по ссылке кароч
            </p>
            <div className="space-4 small-12 columns" />
            <div className="space-3 small-12 medium-2 columns" />
            <button
              onClick={this.disableRegMessage.bind(this)}
              className="overflow-ellipsis button small-bg small-12 medium-8 small-bg columns">
              Вход
            </button>
            <div className="space-3 small-12 medium-2 columns" />
          </div>
        </div>
      );
    }
  }
}

export default connect(
  state => ({
    state: state
  }),
  dispatch => ({
    changeRegBlockState: state => {
      dispatch(homePage.updateRegBlockState(state));
    }
  })
)(EntryForm);
