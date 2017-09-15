import React, { Component } from 'react';
import {
  getStudentsSearchDataByPage,
  getProjectsSearchPreview,
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
    this.timeout = false;
    this.timeBetweenRequests = 700;
  }

  componentWillMount() {
    if (this.props.state.search.searchTags !== [] || this.props.state.search.searchSelectedTags !== []) {
      this.resetData();
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
    if (str === '' && this.props.state.search.searchSelectedTags.length === 0) {
      this.props.updateSearchData([]);
      this.getPopularTags();
    }
    if (this.timeout === false && !(str === '' && this.props.state.search.searchSelectedTags.length === 0)) {
      this.timeout = true;
      setTimeout(
        function() {
          // Get data
          if (this.location === '/students') {
            getTagsByString(undefined, true).then(tags => {
              updateTags(tags);
            });
            getStudentsSearchDataByPage();
          } else if (this.location === '/projects') {
            this.previewData = getProjectsSearchPreview();
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
            this.timeout = false;
          };
        }.bind(this),
        this.timeBetweenRequests
      );
    }
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
            <div className="small-12 medium-12 large-4 columns large-padding-left right">
              <div className="block shadow-1 small-12 columns">
                <ConfigurationForm location={this.location} />
              </div>
            </div>
            <div className="space-2 small-8 columns left" />
            <div className="small-12 medium-12 large-8 columns large-padding-right left">
              <TagResults location={this.location} />
            </div>
            <div className="small-12 medium-12 large-8 space-2 columns large-padding-right left" />
            <div className="small-12 medium-12 large-8 columns large-padding-right left">
              <DataResults location={this.location} />
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default SearchPage;
