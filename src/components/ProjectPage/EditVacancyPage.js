import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { imgUrl, uploadFile, getProject, createProject as addProject } from '../../common/ajaxRequests';
import { defaultImg } from '../../common/helpers';
import Validation from 'react-validation';

class EditProjectPage extends Component {
  constructor(props) {
    super(props);
    this.projectID = +this.props.params.project || '';
    this.state = {
      vacancy: {}
    };
  };

  componentWillMount() {
    this.props.user.id ? null : browserHistory.push('/');
    getProject(this.projectID).then((vacancy) => {
      this.setState({
        vacancy: vacancy
      });
    })
  }

  createProject(e) {
    e.preventDefault();
    let tags = [];
    tags = this.form.components.tags.state.value.split(',').map((tag) => {
      return tag.trim();
    });
    let newProject = {
      avatar: this.state.project.avatar,
      name: this.form.components.name.state.value,
      description: this.form.components.description.state.value,
      tags: tags
    }
    console.log(newProject)
    addProject(newProject);
  }


  render() {
    if (this.state.vacancy.id) {
      return (
        <div>
          <Validation.components.Form ref={form => { this.form = form }}>
            <div style={{ width: '300px' }} className="img-mask auto-img circle border">
              <img alt="pic" className=""
                src={this.state.previewAvatar === null ? defaultImg : this.state.previewAvatar} />
              <div className="img-upload">
                <p>{this.state.imgStatus}</p>
                <input type='file' onChange={this.uploadImage.bind(this)} />
              </div>
            </div>
            <div>
              <Validation.components.Input className="small-12 columns end"
                value={this.props.route.mode !== 'create' ? this.state.project.name : ''}
                placeholder="Название проекта"
                name="name" validations={['isStr', 'required']} />
            </div>
            <Validation.components.Textarea className="small-12 columns end"
              value={this.props.route.mode !== 'create' ? this.state.project.description : ''}
              placeholder="Описание проекта"
              name="description" validations={[]} />
            <Validation.components.Textarea className="small-12 columns end"
              value={this.props.route.mode !== 'create' ? this.state.project.tags.join(', ') : ''}
              placeholder="Ваши теги (через запятую). Например: программирование, дизайн"
              name="tags" validations={[]} />
            <Validation.components.Button type="submit"
              onClick={
                this.props.route.mode === 'create' ?
                  this.createProject.bind(this)
                  :
                  null}
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