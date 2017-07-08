import React, { Component } from 'react';
import {Link} from 'react-router';


class Units extends Component{
    render(){
        return (
            <div className="row">
                <div className="small-no-padding medium-padding-right large-padding-right top-3 small-12 medium-6 large-6 columns">
                    <div className="block shadow-1 columns row">
                        <div className="center medium-bg small-12 columns">
                            <h3>Лучшие студенты</h3>
                        </div>
                        <div className="units small-12 columns">
                            <Link to="/profile">
                                <div className="unit small-12 columns">
                                    <img src="./img/avatar.jpg" alt="Жамбыл Ермагамбет" className="small-img circle border" />
                                    <p>Жамбыл Ермагамбет</p>
                                </div>
                            </Link>
                            <hr />
                            <Link to="/users/66">
                                <div className="unit small-12 columns">
                                    <img src="./img/avatar.jpg" alt="Жамбыл Ермагамбет" className="small-img circle border" />
                                    <p>Жамбыл Ермагамбет</p>
                                </div>
                            </Link>
                            <hr />
                            <a href="./profile">
                                <div className="unit small-12 columns">
                                    <img src="./img/avatar.jpg" alt="Жамбыл Ермагамбет" className="small-img circle border" />
                                    <p>Жамбыл Ермагамбет</p>
                                </div>
                            </a>
                            <hr />
                            <a href="./user/1">
                                <div className="unit small-12 columns">
                                    <img src="./img/avatar.jpg" alt="Жамбыл Ермагамбет" className="small-img circle border" />
                                    <p>Жамбыл Ермагамбет</p>
                                </div>
                            </a>
                            <hr />
                            <a href="./profile">
                                <div className="unit small-12 columns">
                                    <img src="./img/avatar.jpg" alt="Жамбыл Ермагамбет" className="small-img circle border" />
                                    <p>Жамбыл Ермагамбет</p>
                                </div>
                            </a>
                            <hr />
                        </div>
                    </div>
                </div>
                <div className="small-no-padding medium-padding-left large-padding-left top-3 small-12 medium-6 large-6 columns">
                    <div className="block shadow-1 columns row">
                        <div className="center medium-bg small-12 columns">
                            <h3>Студенческие организации </h3>
                        </div>
                        <div className="units small-12 columns">
                            <a href="./projects/79">
                                <div className="unit small-12 columns">
                                    <img src="img/org1.jpg" alt="Лига разработчиков" className="small-img border" />
                                    <p>Лига разработчиков</p>
                                </div>
                            </a>
                            <hr />
                            <a href="./projects/79">
                                <div className="unit small-12 columns">
                                    <img src="img/org1.jpg" alt="Лига разработчиков" className="small-img border" />
                                    <p>Лига разработчиков</p>
                                </div>
                            </a>
                            <hr />
                            <a href="./projects/79">
                                <div className="unit small-12 columns">
                                    <img src="img/org1.jpg" alt="Лига разработчиков" className="small-img border" />
                                    <p>Лига разработчиков</p>
                                </div>
                            </a>
                            <hr />
                            <a href="./projects/79">
                                <div className="unit small-12 columns">
                                    <img src="img/org1.jpg" alt="Лига разработчиков" className="small-img border" />
                                    <p>Лига разработчиков</p>
                                </div>
                            </a>
                            <hr />
                            <a href="./projects/79">
                                <div className="unit small-12 columns">
                                    <img src="img/org1.jpg" alt="Лига разработчиков" className="small-img border" />
                                    <p>Лига разработчиков</p>
                                </div>
                            </a>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Units;