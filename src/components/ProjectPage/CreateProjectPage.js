import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { imgUrl, uploadFile } from '../../common/ajaxRequests';
import { defaultImg } from '../../common/helpers';
import Validation from 'react-validation';

class CreateProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgStatus: 'Загрузить аватар',
      previewAvatar: null,
      project: {
        avatar: null
      }
    }
  }

  componentWillMount() {
    this.props.user.id ? null : browserHistory.push('/');
  }

  lal(e) {
    e.preventDefault();
  }

  uploadImage(e) {
    this.setState({
      imgStatus: 'Загрузка картинки'
    });
    let file = new FormData();
    file.append('Content', e.target.files[0]);
    uploadFile(file).then((res) => {
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
        newProject.avatar = imgUrl + res;
        this.setState({
          projects: newProject,
          previewAvatar: imgUrl + res,
          avatarStatus: 'Картинка загружена'
        })
      }
    })
  }

  render() {
    if (true) {
      return (
        <div>
          <Validation.components.Form>
            <div style={{ width: '300px' }} className="img-mask auto-img circle border">
              <img alt="pic" className=""
                src={this.state.previewAvatar === null ? defaultImg : this.state.previewAvatar} />
              <div className="img-upload">
                <p>{this.state.imgStatus}</p>
                <input type='file' onChange={this.uploadImage.bind(this)} />
              </div>
            </div>
            <div>
              <Validation.components.Input className="small-12 columns end" value='123'
                placeholder="Название проекта"
                name="name" validations={['isStr', 'required']} />
            </div>
            <Validation.components.Textarea className="small-12 columns end" value=''
              placeholder="Описание проекта"
              name="description" validations={[]} />
            <Validation.components.Textarea className="small-12 columns end" value=''
              placeholder="Ваши теги (через пробел). Например: программирование дизайн"
              name="tags" validations={['isStr']} />
            <h2>ВАКАНСИИ</h2>
            <Validation.components.Input className="small-12 columns end" value=''
              placeholder="Название профессии"
              name="v-name" validations={['isStr']} />
            <Validation.components.Textarea className="small-12 columns end" value=''
              placeholder="Описание вакансии"
              name="v-description" validations={[]} />
            <Validation.components.Textarea className="small-12 columns end" value=''
              placeholder="Ваши теги (через пробел). Например: программирование дизайн"
              name="v-tags" validations={['isStr']} />
            <Validation.components.Button type="submit" onClick={this.lal.bind(this)}
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
)(CreateProjectPage);