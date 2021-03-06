import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { getVacancy, createVacancy, editVacancy } from '../../common/ajaxRequests';
import { defaultImg } from '../../common/helpers';
import Validation from 'react-validation';

class EditProjectPage extends Component {
  constructor(props) {
    super(props);
    this.projectID = +this.props.params.project || '';
    this.vacancyID = +this.props.params.vacancy || '';
    this.state = {
      vacancy: {},
      preloader: false
    };
  }

  componentWillMount() {
    this.props.user.id ? null : browserHistory.push('/');
    getVacancy(this.projectID, this.vacancyID).then(vacancy => {
      console.log(vacancy);
      this.setState({
        vacancy: vacancy
      });
    });
  }

  getNewVacancy() {
    let tags = [];
    tags = this.form.components.tags.state.value.split(',').map(tag => {
      return tag.trim();
    });
    let newVacancy = {
      profession: this.form.components.profession.state.value,
      description: this.form.components.description.state.value,
      tags: tags
    };
    console.log(newVacancy);
    return newVacancy;
  }

  createVacancy(e) {
    e.preventDefault();
    this.preloader(true);
    createVacancy(this.projectID, this.getNewVacancy()).then(response => {
      this.preloader(false);
      browserHistory.push('/projects/' + this.projectID);
    });
  }

  editVacancy(e) {
    e.preventDefault();
    this.preloader(true);
    editVacancy(this.projectID, this.vacancyID, this.getNewVacancy()).then(response => {
      this.preloader(false);
      browserHistory.push('/projects/' + this.projectID);
    });
  }

  preloader(value) {
    this.setState({
      preloader: value
    });
  }

  render() {
    if (this.props.route.mode === 'create' || (this.props.route.mode !== 'create' && this.state.vacancy.id)) {
      return (
        <div className="content row">
          <div className="block wide shadow-1 small-12 medium-10 medium-offset-1 large-8 large-offset-2  columns">
            {this.state.preloader ? <div>ПРЕЛОАДЕР</div> : null}
            <Validation.components.Form
              ref={form => {
                this.form = form;
              }}>
              <label className="font-size-20">Название вакансии:</label>
              <div>
                <Validation.components.Input
                  type="text"
                  className="small-12 columns property-input edit full-width"
                  value={this.props.route.mode !== 'create' ? this.state.vacancy.profession : ''}
                  placeholder="Дизайнер"
                  name="profession"
                  validations={['isStr', 'required']}
                />
              </div>
              <div className="space-2 small-12 columns" />
              <label className="font-size-20">Описание вакансии:</label>
              <Validation.components.Textarea
                className="description text-center small-12 columns"
                value={this.props.route.mode !== 'create' ? this.state.vacancy.description : ''}
                placeholder="На вакансию нужен человек..."
                name="description"
                validations={[]}
              />
              <label className="font-size-20">Ваши теги (через запятую):</label>
              <Validation.components.Textarea
                className="description text-center small-12 columns"
                value={this.props.route.mode !== 'create' ? this.state.vacancy.tags.join(', ') : ''}
                placeholder="Программирование, Дизайн"
                name="tags"
                validations={[]}
              />
              <Validation.components.Button
                type="submit"
                onClick={
                  this.props.route.mode === 'create' ? (
                    this.createVacancy.bind(this)
                  ) : (
                    this.editVacancy.bind(this)
                  )
                }
                className="float-none small-bg small-12 medium-4 medium-offset-4 large-4 large-offset-4 columns">
                Отправить
              </Validation.components.Button>
            </Validation.components.Form>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <span className="preloader">
            <div />
            <div />
            <div />
            <div />
          </span>
        </div>
      );
    }
  }
}

export default connect(state => ({
  user: state.userData
}))(EditProjectPage);
