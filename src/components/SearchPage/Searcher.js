import React, { Component } from 'react';
import { connect } from 'react-redux';

class Searcher extends Component {
  constructor(props) {
    super(props);
    this.searchPlaceholder = '';
  }

  render() {
    this.props.location === '/students'
      ? (this.searchPlaceholder = 'Начните вводить имя')
      : (this.searchPlaceholder = 'Начните вводить название проекта');
    return (
      <div className="small-12 medium-12 large-8 columns large-padding-right">
        <div className="block shadow-1 small-12 columns no-padding">
          <input
            onKeyUp={this.props.getPreview}
            className="search"
            type="search"
            placeholder={this.searchPlaceholder}
          />
          <button className="search-button center">
            <i className="material-icons small">search</i>
          </button>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  state: state
}))(Searcher);
