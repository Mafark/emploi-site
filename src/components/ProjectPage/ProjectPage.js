import React, {Component} from 'react';
import {connect} from 'react-redux';
import Information from './Information';
import Vacancies from './Vacancies';

class ProfilePage extends Component {
    render() {
        return (
            <div className="page row expanded">
                <div className="content row">
                    <Information state={this.props.state.userData.project} />
                    <div className="space-4 small-12 columns" />
                    <Vacancies portfolio={this.props.state.userData.portfolio} />
                    <div className="space-4 small-12 columns" />
                    <br />
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        state: state
    })
)(ProfilePage);