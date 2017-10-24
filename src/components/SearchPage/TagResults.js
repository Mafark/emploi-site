import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStudentsSearchDataByPage, getProjectsSearchDataByPage } from '../../common/ajaxRequests';
import { search } from '../../actionCreators';

class TagResults extends Component {
  constructor(props) {
    super(props);
    this.selectedTags = [];
  }

  componentWillMount() {
    // On the projects page add selected tags from profile
    if (this.props.location === '/projects') {
      let userDataTags = this.props.state.userData.tags;
      if (userDataTags) {
        this.selectedTags = userDataTags;
      }
    }
  }

  addSelectedTag(tag) {
    let index = -1;
    let tags = this.props.state.search.searchTags;
    for (let i = 0; i < tags.length; i++) {
      if (tags[i] === tag) {
        index = i;
      }
    }
    let resultTag = tags[index];
    tags.splice(index, 1);
    this.selectedTags = [resultTag, ...this.selectedTags];
    this.props.updateSearchTags(tags);
    this.getPreviewData();
  }

  deleteSelectedTag(tag) {
    let index = -1;
    let tags = this.props.state.search.searchTags;
    for (let i = 0; i < this.selectedTags.length; i++) {
      if (this.selectedTags[i] === tag) {
        index = i;
      }
    }
    let selectedTag = this.selectedTags[index];
    this.selectedTags.splice(index, 1);
    this.props.updateSearchTags([selectedTag, ...tags]);
    this.getPreviewData();
  }

  deleteAllSelectedTags() {
    this.props.updateSearchTags([...this.selectedTags, ...this.props.state.search.searchTags]);
    this.selectedTags = [];
    this.getPreviewData();
  }

  getPreviewData() {
    this.props.updateSearchSelectedTags(this.selectedTags);
    if (this.props.location === '/students') {
      getStudentsSearchDataByPage();
    } else if (this.props.location === '/projects') {
      getProjectsSearchDataByPage();
    }
  }

  render() {
    return (
      <div className="search-units block shadow-1 small-12 columns">
        <div>
          <div className="small-12 columns">
            {this.props.state.search.searchTags.length === 0 && this.selectedTags.length === 0 ? (
              <div className="color-grey center">Здесь будут предложенные теги</div>
            ) : (
              <span
                className="icon-link icon-link__small inline tag"
                onClick={this.deleteAllSelectedTags.bind(this)}>
                Очистить
              </span>
            )}
            {this.selectedTags.map((tag, index) => {
              return (
                <div
                  key={index}
                  onClick={this.deleteSelectedTag.bind(this, tag)}
                  className="tag activated circle small-bg">
                  {tag}
                  <i className="material-icons">&#xE5CD;</i>
                </div>
              );
            })}
            {this.props.state.search.searchTags.map((tag, index) => {
              return (
                <div
                  key={index}
                  onClick={this.addSelectedTag.bind(this, tag)}
                  className="tag disabled circle small-bg">
                  {tag}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    state: state
  }),
  dispatch => ({
    updateSearchData: data => {
      dispatch(search.updateData(data));
    },
    updateSearchTags: tags => {
      dispatch(search.updateTags(tags));
    },
    updateSearchSelectedTags: tags => {
      dispatch(search.updateSelectedTags(tags));
    }
  })
)(TagResults);
