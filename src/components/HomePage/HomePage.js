import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getHomePageData} from '../../common/ajaxRequests'
import EntryForm from './EntryForm';
import UserForm from './UserForm';
import Events from './Events';
import Units from './Units';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class HomePage extends Component {
    form() {
        if (this.props.state.userData.name === undefined) {
            return <EntryForm />
        } else {
            return <UserForm />
        }
    }

    render() {
        getHomePageData();
        return (
            <div className="page row expanded">
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnter={false}
                    transitionLeave={false}
                    transitionAppear={true}
                    transitionAppearTimeout={500}>
                <div className="content small-12 row">
                    <div id="entry-text" className={`${this.props.state.homePage.regBlockIsOpen ? 'medium-0 large-0' : ''} small-12 medium-6 large-5 columns`}>
                        <p className="main-text">Реализовать свои приобретенные навыки или найти нужного человека
                            себе в команду, в этом вам поможет <b>Emploi</b></p>
                    </div>
                    <div id="entry-space" className={`${this.props.state.homePage.regBlockIsOpen ? 'large-0' : ''} space-4 small-0 medium-0 large-2 columns`}/>
                    {this.form()}
                    <div className="space-3 small-12 columns"/>
                    <Events />
                    <div className="space-4 small-1 small-0 medium-0 columns"/>
                    <div className="small-rm medium-5 large-4 center columns">
                        <div className="animated-character">
                            <div className="newcharacter404">
                                <div className="torso">
                                    <div className="body"/>
                                    <div className="leftarm"/>
                                    <div className="rightarm"/>
                                    <div className="head">
                                        <div className="eyes"/>
                                    </div>
                                </div>
                                <div className="laptop"/>
                            </div>
                        </div>
                    </div>
                    <div className="space-3 small-12 columns"/>
                    <hr />
                    <div className="space-3 small-12 columns"/>
                    <Units />
                </div>
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

export default connect(
    state => ({
        state: state
    })
)(HomePage);