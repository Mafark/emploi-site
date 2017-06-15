import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {logOut} from '../../common/helpers';

class UserForm extends Component {
    handleMoveToProfileClick(){
        browserHistory.push('/profile');
    }
    render() {
        return(
            <div className="entry block shadow-3 small-12 medium-6 large-5 columns">
                <div className="small-12 center columns">
                    <img alt="pic" className="auto-img circle border" src={this.props.state.userData.avatar} />
                </div>
                <div className="small-12 text-center columns no-padding">
                    <h2 className="full-name text-center small-12 columns no-padding">{this.props.state.userData.name + ' ' + this.props.state.userData.surname}</h2>
                </div>
                <button id="edit" onClick={this.handleMoveToProfileClick} className="small-8 small-bg border-left border-white columns no-hover hover-scale">Профиль</button>
                <button id="exit" onClick={logOut} className="small-4 small-bg border-right border-white columns no-hover hover-scale"><i className="material-icons small">exit_to_app</i></button>
            </div>
        )
    }
}

export default connect(
    state => ({
        state: state
    })
)(UserForm);