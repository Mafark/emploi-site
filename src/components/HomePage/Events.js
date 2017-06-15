import React, { Component } from 'react';

class Events extends Component{
    render(){
        return (
            <div className="small-12 medium-7 large-7 columns no-padding">
                <div className="row events">
                    <h2 className="small-12 text-center columns">Последние события</h2>
                    <div className="block event space-5 shadow-1 small-12 columns row">
                        <div className="event-left center medium-bg small-2 medium-0 left">
                            <i className="material-icons">person_add</i>
                        </div>
                        <div className="event-right space-5 left">
                            <h3 className="overflow-ellipsis">Новый пользователь</h3>
                            <p className="expand-inline">Теперь с нами Вася Пупкин. Давайте поздравим его!</p>
                        </div>
                    </div>
                    <div className="block event space-5 shadow-1 small-12 columns row">
                        <div className="event-left center medium-bg small-2 medium-0 left">
                            <i className="material-icons">group_add</i>
                        </div>
                        <div className="event-right space-5 left">
                            <h3 className="overflow-ellipsis">Новое обьединение</h3>
                            <p className="expand-inline">Проект про что-то интересное. Он очень важен для нас!</p>
                        </div>
                    </div>
                    <div className="block event space-5 shadow-1 small-12 columns row">
                        <div className="event-left center medium-bg small-2 medium-0 left">
                            <i className="material-icons">note_add</i>
                        </div>
                        <div className="event-right space-5 left">
                            <h3 className="overflow-ellipsis">Новая вакансия</h3>
                            <p className="expand-inline">Оч классная и необычная вакансия поможет тебе раскрыть свой потенциал</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Events;