import React, {Component} from 'react';
import {Link} from 'react-router';

class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.editProfile = false;
    }

    componentWillMount() {
        if (this.props.ProfileLoaded) {
            this.editProfile = this.props.ProfileLoaded;
        }
    }

    render() {
        return (
            <div className="small-12 center columns no-padding">
                <div className="projects transition small-12 medium-12 large-10">
                    <h2 className="small-12 text-center columns">Портфолио</h2>
                    <div className="space-2 small-12 columns"/>
                    {
                        this.props.portfolio.map((project, index) => {
                            return (
                                <div key={index} className="block project shadow-1 small-12 columns row">
                                    <div className="small-6 medium-4 columns">
                                        <img src={project.imageUrl} alt="img"/>
                                        <div className="small-rm">
                                            {
                                                project.members.map((member, index) => {
                                                    return (
                                                        <div key={index} className="member small-12 columns no-padding">
                                                            <p className="role">{member.role}</p>
                                                            <Link to={"/users/" + member.id}
                                                                  className="name">{member.name + ' ' + member.surname}</Link>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="small-6 medium-8 columns">
                                        <h2 className="small-12 medium-6 nowrap no-padding columns">{project.title}</h2>
                                        <p className="role medium-rm large-rm">Тимлид</p>
                                        <Link to={"/users/" + project.leader.id}
                                              className="small-12 medium-6 nowrap no-padding columns">{project.leader.name + ' ' + project.leader.surname}</Link>
                                    </div>
                                    <div className="small-6 medium-rm large-rm columns">
                                        {
                                            project.members.map((member, index) => {
                                                return (
                                                    <div key={index} className="member small-12 columns no-padding">
                                                        <p className="role">{member.role}</p>
                                                        <Link to={"/users/" + member.id}
                                                              className="name">{member.name + ' ' + member.surname}</Link>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="small-12 medium-8 columns">
                                        <p>{project.description}</p>
                                    </div>
                                    <div className="small-12 medium-8 columns">
                                        {
                                            project.tags.map((tag, index) => {
                                                return(
                                                    <div key={index} className="tag circle small-bg">{tag}</div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Portfolio;