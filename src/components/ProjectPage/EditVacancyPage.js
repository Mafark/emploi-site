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
    this.vacancyID = +this.props.params.vacancy || ''
    this.state = {
      vacancy: {}
    };
  };

  componentWillMount() {
    this.props.user.id ? null : browserHistory.push('/');
    getVacancy(this.projectID, this.vacancyID).then((vacancy) => {
      console.log(vacancy)
      this.setState({
        vacancy: vacancy
      });
    })
  }

  getNewVacancy() {
    let tags = [];
    tags = this.form.components.tags.state.value.split(',').map((tag) => {
      return tag.trim();
    });
    let newVacancy = {
      profession: this.form.components.profession.state.value,
      description: this.form.components.description.state.value,
      tags: tags
    }
    console.log(newVacancy)
    return newVacancy;
  }

  createVacancy(e) {
    e.preventDefault();
    createVacancy(this.projectID, this.getNewVacancy());
  }

  editVacancy(e) {
    e.preventDefault();
    editVacancy(this.projectID, this.vacancyID, this.getNewVacancy());
  }

  render() {
    if (this.props.route.mode === 'create' || (this.props.route.mode !== 'create' && this.state.vacancy.id)) {
      return (
        <div>
          <Validation.components.Form ref={form => { this.form = form }}>
            <div>
              <Validation.components.Input className="small-12 columns end"
                value={this.props.route.mode !== 'create' ? this.state.vacancy.profession : ''}
                placeholder="Название вакансии"
                name="profession" validations={['isStr', 'required']} />
            </div>
            <Validation.components.Textarea className="small-12 columns end"
              value={this.props.route.mode !== 'create' ? this.state.vacancy.description : ''}
              placeholder="Описание вакансии"
              name="description" validations={[]} />
            <Validation.components.Textarea className="small-12 columns end"
              value={this.props.route.mode !== 'create' ? this.state.vacancy.tags.join(', ') : ''}
              placeholder="Ваши теги (через запятую). Например: программирование, дизайн"
              name="tags" validations={[]} />
            <Validation.components.Button type="submit"
              onClick={
                this.props.route.mode === 'create' ?
                  this.createVacancy.bind(this)
                  :
                  this.editVacancy.bind(this)}
              className="donation-form-btn pointer m-b-2 small-12 columns">
              submite
            </Validation.components.Button>
          </Validation.components.Form>
        </div>
      )
    } else {
      return (
        <div>
          <span className="preloader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </span>
        </div>
      )
    }
  }
}

export default connect(
  state => ({
    user: state.userData
  })
)(EditProjectPage);