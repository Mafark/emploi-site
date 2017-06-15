import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Information from './Information';
import Portfolio from './Portfolio';

class ProfilePage extends Component {
    constructor() {
        super();
        this.state = {
            editing: false
        }
    }

    componentWillMount() {
        if (this.props.state.userData.id === undefined) {
            browserHistory.push('');
        }
    }

    changeEditState(state) {
        this.setState({
            editing: state
        });
    }

    render() {
        if (this.props.state.userData.id !== undefined) {
            return (
                <div className="page row expanded">
                    <div className="content row">
                        <Information user={this.props.state.userData}
                                     editing={this.state.editing}
                                     changeEditState={this.changeEditState.bind(this)}
                                     ProfileLoaded={true}/>
                        <div className="space-4 small-12 columns"/>
                        {
                            this.props.state.userData.portfolio.length !== 0 ?
                            <Portfolio portfolio={this.props.state.userData.portfolio}
                                       ProfileLoaded={true}/>
                            :
                            null
                        }
                    </div>
                </div>
            )
        } else {
            return (<div></div>)
        }
    }
}

export default connect(
    state => ({
        state: state
    })
)(ProfilePage);