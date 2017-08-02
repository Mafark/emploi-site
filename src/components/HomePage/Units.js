import React, { Component } from 'react';
import { Link } from 'react-router';
import { getBestStudents } from '../../common/ajaxRequests';

class Units extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bestPlayers: []
    };
  }
  componentWillMount() {
    getBestStudents().then(players => {
      this.setState({
        bestPlayers: players
      });
    });
  }
  render() {
    return (
      <div className="row">
        <div className="small-no-padding medium-padding-right large-padding-right top-3 small-12 medium-6 large-6 columns">
          <div className="block shadow-1 columns row">
            <div className="center medium-bg small-12 columns">
              <h3>Лучшие студенты</h3>
            </div>
            <div className="units small-12 columns">
              {this.state.bestPlayers.map((player, index) => {
                return (
                  <div key={index}>
                    <Link to={'/users/' + player.id}>
                      <div className="unit small-12 columns">
                        <img
                          src={player.avatar}
                          alt={player.surname + ' ' + player.name}
                          className="small-img circle border"
                        />
                        <p>
                          {player.surname + ' ' + player.name}
                        </p>
                      </div>
                    </Link>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="small-no-padding medium-padding-left large-padding-left top-3 small-12 medium-6 large-6 columns">
          <div className="block shadow-1 columns row">
            <div className="center medium-bg small-12 columns">
              <h3>Студенческие организации </h3>
            </div>
            <div className="units small-12 columns">
              <Link href="/projects/2">
                <div className="unit small-12 columns">
                  <img src="img/org1.jpg" alt="Лига разработчиков" className="small-img border" />
                  <p>Лига разработчиков</p>
                </div>
              </Link>
              <hr />
              <Link href="/projects/2">
                <div className="unit small-12 columns">
                  <img src="img/org1.jpg" alt="Лига разработчиков" className="small-img border" />
                  <p>Лига разработчиков</p>
                </div>
              </Link>
              <hr />
              <Link href="/projects/2">
                <div className="unit small-12 columns">
                  <img src="img/org1.jpg" alt="Лига разработчиков" className="small-img border" />
                  <p>Лига разработчиков</p>
                </div>
              </Link>
              <hr />
              <Link href="/projects/2">
                <div className="unit small-12 columns">
                  <img src="img/org1.jpg" alt="Лига разработчиков" className="small-img border" />
                  <p>Лига разработчиков</p>
                </div>
              </Link>
              <hr />
              <Link href="/projects/2">
                <div className="unit small-12 columns">
                  <img src="img/org1.jpg" alt="Лига разработчиков" className="small-img border" />
                  <p>Лига разработчиков</p>
                </div>
              </Link>
              <hr />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Units;
