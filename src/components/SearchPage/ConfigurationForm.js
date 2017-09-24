import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStudentsSearchDataByPage, getProjectsSearchPreview } from '../../common/ajaxRequests';
import { search } from '../../actionCreators';

class ConfigurationForm extends Component {
  constructor(props) {
    super(props);
    this.config = {
      course: '1',
      institute: 'any',
      interests: 'any'
    };
  }

  componentDidMount() {
    this.changeConfig();
  }

  changeConfig() {
    this.props.updateSearchConfig({
      course: this.course.value,
      institute: this.institute.value
    });
    this.getPreview();
  }

  getPreview() {
    if (this.props.location === '/students') {
      getStudentsSearchDataByPage();
    } else if (this.props.location === '/projects') {
      this.props.updateSearchData(getProjectsSearchPreview().data);
    }
  }

  render() {
    return (
      <div className="form small-12 columns no-padding">
        <div className="space-2 small-12 columns" />
        <div className="small-12 medium-6 large-12 columns">
          <label htmlFor="course" className="small-12 center columns">
            Курс
          </label>
          <select
            ref={select => (this.course = select)}
            onChange={this.changeConfig.bind(this)}
            id="course"
            className="small-12 columns"
            type="text"
            required>
            <option value="any">Любой</option>
            <option value="1">1 курс (бакалавриат)</option>
            <option value="2">2 курс (бакалавриат)</option>
            <option value="3">3 курс (бакалавриат)</option>
            <option value="4">4 курс (бакалавриат)</option>
            <option value="5">1 курс (магистратура)</option>
            <option value="6">2 курс (магистратура)</option>
          </select>
        </div>
        <div className="small-12 medium-6 large-12 columns">
          <label htmlFor="course" className="small-12 center columns">
            Институт
          </label>
          <select
            ref={select => (this.institute = select)}
            onChange={this.changeConfig.bind(this)}
            id="course"
            className="small-12 columns"
            type="text"
            required>
            <option value="any">Любой</option>
            <option value="itasu">ИТАСУ</option>
            <option value="inmin">ИНМИН</option>
            <option value="ekotekh">ЭКОТЕХ</option>
            <option value="ibo">ИБО</option>
          </select>
        </div>
        {/* <div className="small-12 medium-12 large-12 columns">
          <label htmlFor="interests" className="small-12 center columns">
            Область знаний
          </label>
          <select id="interests" className="small-12 columns" type="text" required>
            <option value="any">Любые</option>
            <option value="programming">Программирование</option>
            <option value="mockup">Верстка</option>
            <option value="movie">Монтаж</option>
          </select>
          <div className="space-2 small-12 " />
        </div> */}
        <div className="space-2 small-12 columns" />
      </div>
    );
  }
}

export default connect(
  state => ({
    state: state
  }),
  dispatch => ({
    updateSearchConfig: config => {
      dispatch(search.updateConfig(config));
    },
    updateSearchData: data => {
      dispatch(search.updateData(data));
    }
  })
)(ConfigurationForm);
