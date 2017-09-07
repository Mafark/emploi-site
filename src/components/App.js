import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from '../common/ajaxRequests';
import { userData } from '../actionCreators';

import '../common/validationRules';
import Header from './Header';
import Footer from './Footer';
import Preloader from './Preloader';

class App extends Component {
  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token != null) {
      console.log('АХТУНГ!!! АХТУНГ!! ОБНАРУЖЕН ТОКЕН!!');
      getCurrentUser();
    } else {
      console.log('ТОКЕН НЕ ОБНАРУЖЕН!!!');
      this.props.resetUserData(); // Need for dell the temporal property userData.loaded
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.state.userData.loaded !== false ? (
          <div>{this.props.children}</div>
        ) : (
          <div
            style={{
              minHeight: '100vh'
            }}>
            <Preloader />
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

export default connect(
  state => ({
    state: state
  }),
  dispatch => ({
    resetUserData() {
      dispatch(userData.updateUser({}));
    }
  })
)(App);
