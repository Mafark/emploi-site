import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserByID } from '../../common/ajaxRequests';
import Information from './Information';
import Portfolio from './Portfolio';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentWillMount() {
    getUserByID(this.props.params.user).then((user) => {
      if (!user || user === null) {
        throw new TypeError('User not found');
      }
      //DELL
      console.log(user);
      user.avatar = '/img/avatar.png';
      user.organizations = [];
      //DELL
      this.setState({ user: user });
    })
  }

  render() {
    if (this.state.user.id) {
      return (
        <div className="page row expanded">
          <div className="content row">
            <Information user={this.state.user} />
            <div className="space-4 small-12 columns" />
            {
              (() => {
                if (this.state.user.portfolio.length !== 0) {
                  return <Portfolio portfolio={this.state.user.portfolio} />
                }
              })()
            }
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <span className="preloader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </span>
        </div>
      )
    }
  }
}

export default connect(
  state => ({
    state: state
  })
)(UserPage);