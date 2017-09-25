import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import {
  imgUrl,
  uploadFile,
  getProject,
  createProject,
  editProject,
  getCurrentUser
} from '../../common/ajaxRequests';
import { defaultImg } from '../../common/helpers';
import Validation from 'react-validation';

class EditProjectPage extends Component {
  constructor(props) {
    super(props);
    this.projectID = +this.props.params.project || '';
    this.state = {
      imgStatus: 'Загрузить аватар',
      previewAvatar: null,
      project: {
        avatar: null
      },
      preloader: false
    };
  }

  componentWillMount() {
    this.props.user.id ? null : browserHistory.push('/');
    if (this.props.route.mode !== 'create') {
      getProject(this.projectID).then(project => {
        if (!project || project === null) {
          throw new TypeError('Project not found');
        }
        this.setState({
          project: project,
          previewAvatar: project.avatar
        });
      });
    }
  }

  uploadImage(e) {
    this.setState({
      imgStatus: 'Загрузка картинки'
    });
    let file = new FormData();
    file.append('Content', e.target.files[0]);
    uploadFile(file).then(res => {
      if (res.status) {
        if (res.status === 406) {
          this.setState({
            imgStatus: 'Разрешенные форматы: png, jpg, jpeg'
          });
        } else {
          this.setState({
            imgStatus: `Неизвестная ошибка: ${res.status}`
          });
        }
      } else {
        let newProject = Object.assign({}, this.state.project);
        newProject.avatar = res;
        console.log(newProject);
        this.setState({
          project: newProject,
          previewAvatar: imgUrl + res,
          imgStatus: 'Картинка загружена'
        });
      }
    });
  }

  getNewProject() {
    let tags = [];
    tags = this.form.components.tags.state.value.split(',').map(tag => {
      return tag.trim();
    });
    if (this.state.project.avatar === '/img/avatar.png') {
      this.state.project.avatar = null;
    }
    let newProject = {
      avatar: this.state.project.avatar,
      name: this.form.components.name.state.value,
      description: this.form.components.description.state.value,
      tags: tags
    };
    console.log(newProject);
    return newProject;
  }

  createProject(e) {
    e.preventDefault();
    this.preloader(true);
    createProject(this.getNewProject()).then(response => {
      console.log(response);
      getCurrentUser().then(() => {
        this.preloader(false);
        browserHistory.push('/profile');
      });
    });
  }

  editProject(e) {
    e.preventDefault();
    this.preloader(true);
    editProject(this.projectID, this.getNewProject()).then(response => {
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
    if (this.props.route.mode === 'create' || (this.props.route.mode !== 'create' && this.state.project.id)) {
      return (
        <div className="content row">
          <div className="block wide shadow-1 small-12 medium-10 medium-offset-1 large-8 large-offset-2  columns">
            {this.state.preloader ? <div>ПРЕЛОАДЕР</div> : null}
            <Validation.components.Form
              ref={form => {
                this.form = form;
              }}>
              {!this.props.route.mode === 'create' ? (
                <div className="small-12 center columns">
                  <div style={{ width: '300px' }} className="img-mask auto-img circle border">
                    <img
                      alt="pic"
                      className=""
                      src={this.state.previewAvatar === null ? defaultImg : this.state.previewAvatar}
                    />
                    <div className="img-upload">
                      <p>{this.state.imgStatus}</p>
                      <input type="file" onChange={this.uploadImage.bind(this)} />
                    </div>
                  </div>
                </div>
              ) : null}
              <div>
                <Validation.components.Input
                  type="text"
                  className="small-12 columns property-input edit full-width"
                  value={this.props.route.mode !== 'create' ? this.state.project.name : ''}
                  placeholder="Название проекта"
                  name="name"
                  validations={['isStr', 'required']}
                />
              </div>
              <div className="space-2 small-12 columns" />
              <Validation.components.Textarea
                className="description text-center small-12 columns"
                value={this.props.route.mode !== 'create' ? this.state.project.description : ''}
                placeholder="Описание проекта"
                name="description"
                validations={[]}
              />
              <Validation.components.Textarea
                className="description text-center small-12 columns"
                value={this.props.route.mode !== 'create' ? this.state.project.tags.join(', ') : ''}
                placeholder="Ваши теги (через запятую). Например: программирование, дизайн"
                name="tags"
                validations={[]}
              />
              <Validation.components.Button
                type="submit"
                onClick={
                  this.props.route.mode === 'create' ? (
                    this.createProject.bind(this)
                  ) : (
                    this.editProject.bind(this)
                  )
                }
                className="small-bg small-12 medium-4 medium-offset-4 large-4 large-offset-4 columns">
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
