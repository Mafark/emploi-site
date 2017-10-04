import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logOut } from '../common/helpers';

class Header extends Component {
  constructor(props) {
    super(props);
    this.menuOpened = false;
  }

  changeMenuState() {
    if (this.menuOpened && this.props.state.userData.loaded !== false) {
      this.menuOpened = false;
      document.getElementsByClassName('menu-right')[0].classList.remove('active');
      let menuItems = document.getElementsByClassName('menu-item');
      for (let i = 0; i < menuItems.length; i++) {
        menuItems[i].classList.remove('active');
      }
    } else {
      this.menuOpened = true;
      document.getElementsByClassName('menu-right')[0].classList.add('active');
      let menuItems = document.getElementsByClassName('menu-item');
      for (let i = 0; i < menuItems.length; i++) {
        menuItems[i].classList.add('active');
      }
    }
  }

  render() {
    return (
      <header className="row expanded">
        <div className="small-12 columns">
          <ul className="menu menu-left">
            <li className="menu-item logo">
              <Link to="/">Emploi</Link>
            </li>
          </ul>
          <ul className="menu">
            <li className="entry-btn sign-in menu-item small-rm">
              {this.props.state.userData.id ? <a onClick={logOut}>Выход →</a> : <Link to="/">Вход →</Link>}
            </li>
            {this.props.state.userData.id ? (
              <li className="entry-btn sign-in menu-item small-rm">
                <Link to="/profile">
                  <i className="material-icons small">&#xE7FF;</i>
                </Link>
              </li>
            ) : null}
            <i className="entry-btn icon material-icons menu-icon center medium-rm large-rm">input</i>
            <div className="entry-popup small-3 medium-4" />
          </ul>
          <i className="material-icons menu-icon center medium-rm large-rm">menu</i>
          <div onClick={this.changeMenuState.bind(this)} id="menu" className="medium-rm large-rm" />
          <div id="sign" className="entry-btn medium-rm large-rm" />
          <ul className="menu menu-right">
            <li className="menu-item delay-2">
              <Link to="/projects">Проекты</Link>
              <div />
            </li>
            <li className="menu-item delay-3">
              <Link to="/students">Студенты</Link>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}

export default connect(state => ({
  state: state
}))(Header);
