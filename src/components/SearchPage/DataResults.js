import React, {Component} from 'react';
import {connect} from 'react-redux';
import Waypoint from 'react-waypoint';
import {getStudentsSearchDataByPage} from '../../common/ajaxRequests';
import {Link} from 'react-router';

class DataResults extends Component {
    getNextPage() {
        if (this.props.location === '/students') {
            getStudentsSearchDataByPage();
        } else if (this.props.location === '/projects'){
            console.log('Ждун');
        }
    }

    render() {
        if (this.props.state.search.searchString === '' && this.props.state.search.searchSelectedTags.length === 0) {
            return (
                <div className="search-units block shadow-1 small-12 columns">
                    <div>
                        <div className="space-3 small-12 columns"/>
                        <div className="small-12 columns">
                            <h2 className="text-center disabled thin">Здесь будут результаты поиска</h2>
                        </div>
                        <div className="space-3 small-12 columns"></div>
                    </div>
                </div>
            )
        } else if (this.props.location === '/students') {
            return (
                <div className="search-units block shadow-1 small-12 columns">
                    {
                        this.props.state.search.searchData.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Link to={'/users/' + item.id} className="search-unit small-12 columns">
                                        <img src={item.avatar} alt={item.name + ' ' + item.surname}
                                             className="medium-img circle border"/>
                                        <div className="small-12 columns">
                                            <p>{item.name + ' ' + item.surname}</p>
                                            {
                                                item.tags.map((tag, index) => {
                                                    return (
                                                        <div key={index} className="tag circle small-bg">{tag}</div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </Link>
                                    <hr/>
                                </div>
                            )
                        })
                    }
                    <Waypoint onEnter={this.getNextPage.bind(this)}/>
                </div>
            )
        } else if(this.props.location === '/projects') {
            return (
                <div className="block wide shadow-1 small-12 columns row">
                    <div className="space-1 small-3 medium-rm large-rm columns"></div>
                    <div className="small-12 medium-12 large-padding-left-3 columns">
                        <p>
                            <div className="small-12 medium-4 padding-right-3 columns small-no-padding">
                                <div className="space-1 small-2 medium-rm large-rm columns"/>
                                <img src="./img/logo.png" className="small-8 medium-12 border columns no-padding margin-bottom" alt="LOD"/>
                                <div className="space-1 small-2 medium-rm large-rm columns"/>
                            </div>
                            <div className="small-12 medium-8 large-padding-left-3 columns no-padding">
                                <h2 className="small-12 full-name small-text-center no-margin no-padding columns">Сайт лиги разработчиков</h2>
                                <a href="#" className="small-12 small-text-center no-padding columns">Борис Вальдман</a>
                            </div>
                            <div className="space-2 small-12 medium-8 columns"/>
                            Реализовать свои приобретенные навыки или найти нужного человека себе в команду, в этом вам поможет Emploi
                        </p>
                    </div>
                    <hr/>
                    <div className="space-2 small-12 columns"></div>
                    <div className="small-12 large-padding-left-3 columns">
                        <div className="tag circle small-bg">Программирование</div>
                        <div className="tag circle small-bg">Дизайн</div>
                        <div className="tag circle small-bg">Экология</div>
                    </div>
                    <div className="small-12 columns no-padding">
                        <div className="member small-6 medium-6 large-4 large-padding-left-3 columns end">
                            <p className="role">Копатель</p>
                            <a href="#" className="name">Жамбыл Ермагамбет</a>
                        </div>
                        <div className="member small-6 medium-6 large-4 large-padding-left-3 columns end">
                            <p className="role">Тимлид</p>
                            <a href="#" className="name">Борис Вальдман</a>
                        </div>
                    </div>
                    <Waypoint onEnter={this.getNextPage.bind(this)}/>
                </div>
            )
        }
    }
}

export default connect(
    state => ({
        state: state
    })
)(DataResults);