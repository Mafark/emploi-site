import React, {Component} from 'react';

class Information extends Component {

    render() {
        return (
            <div className="block wide shadow-1 small-12 columns row">
                <div className="space-1 small-3 medium-rm large-rm columns"></div>
                <div className="small-12 medium-12 large-padding-left-3 columns">
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
                    <p>Реализовать свои приобретенные навыки или найти нужного человека себе в команду, в этом вам поможет Emploi
                        <br/>
                        <div className="tag circle small-bg">Программирование</div>
                        <div className="tag circle small-bg">Дизайн</div>
                        <div className="tag circle small-bg">Экология</div></p>
                    <div className="small-12 medium-8 columns no-padding">
                    </div>
                </div>

            </div>
        )
    }
}

export default Information;