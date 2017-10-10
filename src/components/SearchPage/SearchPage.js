import React, { Component } from 'react';
import {
  getStudentsSearchDataByPage,
  getProjectsSearchDataByPage,
  getTagsByString
} from '../../common/ajaxRequests';
import Searcher from './Searcher';
import DataResults from './DataResults';
import TagResults from './TagResults';
import ConfigurationForm from './ConfigurationForm';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    if (this.getPopularTags === SearchPage.prototype.getPopularTags) {
      throw new TypeError('Please implement method getPopularTags.');
    }
    this.location = window.location.pathname;
    this.previewData = {};
    // this.timeout = false;
    // this.timeBetweenRequests = 700;
    this.timerId;
    this.delayForTimer = 1000;
    this.dataForVacancy = null;
    this.la = {
      id: 1,
      avatar: 'p5f4rrtd.jpg',
      leader: { id: 1, name: 'Василийй', surname: 'Пушкин', avatar: '1llfnoeh.jpg' },
      name: 'ПРоектик',
      description: 'Описаниекакое-то  jdf kjdf kjdfkjdfjk df df kjdf',
      tags: ['лох', 'хуй', 'пидор', 'да'],
      team: [
        {
          id: 1,
          member: { id: 1, name: 'Василийй', surname: 'Пушкин', avatar: '1llfnoeh.jpg' },
          profession: 'Крутая вакансия',
          description:
            'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблон',
          tags: ['хз', 'ча', 'чо', 'чу']
        },
        {
          id: 2,
          member: null,
          profession: 'Ептать',
          description: 'Хуй пизда залупа лала лоло',
          tags: ['фыдво', 'asc', 'sdf']
        }
      ]
    };
  }

  componentWillMount() {
    if (this.props.state.search.searchTags !== [] || this.props.state.search.searchSelectedTags !== []) {
      this.resetData();
    }
    if (
      this.props.location.query.project &&
      this.props.location.query.vacancy &&
      this.props.location.query.tags
    ) {
      this.dataForVacancy = Object.assign({}, this.props.location.query);
      this.props.updateSearchSelectedTags(this.dataForVacancy);
    }

    this.getPopularTags();
  }

  resetData() {
    this.props.changeSearchString('');
    this.props.updateSearchTags([]);
    this.props.updateSearchSelectedTags([]);
  }

  getPreview(e) {
    let str = e.target.value;
    this.props.changeSearchString(str);
    clearTimeout(this.timerId);
    this.timerId = setTimeout(
      function() {
        if (this.location === '/students') {
          getTagsByString(undefined, true).then(tags => {
            updateTags(tags);
          });
          getStudentsSearchDataByPage();
        } else if (this.location === '/projects') {
          getTagsByString(undefined, true).then(tags => {
            updateTags(tags);
          });
          getProjectsSearchDataByPage();
        }
        let updateTags = tags => {
          let selectedTags = this.props.state.search.searchSelectedTags;
          // Copy array
          let resultTags = tags.slice(0);
          // Remove elements matching with the existing selected tags
          let indexForDell = -1;
          for (let i = 0; i < selectedTags.length; i++) {
            indexForDell = resultTags.indexOf(selectedTags[i]);
            if (indexForDell !== -1) {
              resultTags.splice(indexForDell, 1);
              indexForDell = -1;
            }
          }
          // Update tags
          this.props.updateSearchTags(resultTags);
        };
      }.bind(this),
      this.delayForTimer
    );
  }

  render() {
    return (
      <div className="page row expanded">
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnter={false}
          transitionLeave={false}
          transitionAppear={true}
          transitionAppearTimeout={500}>
          <div className="content row">
            <Searcher getPreview={this.getPreview.bind(this)} location={this.location} />
            <div className="space-2 small-8 large-0 columns left" />
            {this.location === '/students' ? (
              <div className="small-12 medium-12 large-4 columns large-padding-left right">
                <div className="block shadow-1 small-12 columns">
                  <ConfigurationForm location={this.location} />
                </div>
              </div>
            ) : null}
            <div className="space-2 small-8 columns left" />
            <div
              className={
                'small-12 medium-12 columns large-padding-right left ' +
                (this.location === '/students' ? 'large-8' : 'large-12')
              }>
              <TagResults location={this.location} />
            </div>
            <div
              className={
                'small-12 medium-12 space-2 columns large-padding-right left ' +
                (this.location === '/students' ? 'large-8' : 'large-12')
              }
            />
            <div
              className={
                'small-12 medium-12 columns large-padding-right left ' +
                (this.location === '/students' ? 'large-8' : 'large-12')
              }>
              <DataResults
                location={this.location}
                dataForVacancy={this.dataForVacancy}
                userData={this.props.state.userData}
              />
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default SearchPage;
