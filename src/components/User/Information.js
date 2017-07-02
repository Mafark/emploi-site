import React, { Component } from "react";
import { connect } from "react-redux";
import { imgUrl, editUser, uploadFile, editTags } from "../../common/ajaxRequests";
import Tags from "./Tags";
import Organisations from "./Organizations";
import { userData } from '../../actionCreators';

class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editClass: '',
      user: {
        name: this.props.user.name,
        surname: this.props.user.surname,
        middleName: this.props.user.middleName,
        institute: this.props.user.institute,
        course: this.props.user.course,
        direction: this.props.user.direction,
        aboutMe: this.props.user.aboutMe,
        avatar: this.props.user.avatar,
        contacts: this.props.user.contacts
      },
      addedContacts: [{
        name: '',
        value: ''
      }],
      previewAvatar: null,
      avatarStatus: 'Загрузить аватар'
    };
    this.contacts = this.props.user.contacts.slice(0);
  }

  uploadImage(e) {
    this.setState({
      avatarStatus: 'Загрузка аватара'
    });
    let file = new FormData();
    file.append('Content', e.target.files[0]);
    uploadFile(file).then((res) => {
      if (res.status) {
        if (res.status === 406) {
          this.setState({
            avatarStatus: 'Разрешенные форматы: png, jpg, jpeg'
          });
        } else {
          this.setState({
            avatarStatus: `Неизвестная ошибка: ${res.status}`
          });
        }
      } else {
        let newUserWithAvatar = Object.assign({}, this.state.user);
        newUserWithAvatar.avatar = imgUrl + res;
        console.log('state' + this.state.user.avatar)
        this.setState({
          user: newUserWithAvatar,
          previewAvatar: imgUrl + res,
          avatarStatus: 'Аватар загружен'
        });
        console.log(newUserWithAvatar.avatar)
      }
    })
  }

  changeItem(typeOfItem, proxy) {
    let newUser = Object.assign({}, this.state.user);
    newUser[typeOfItem] = proxy.target.value;
    this.setState({
      user: newUser
    });
  }

  changeContact(contact, typeOfContact, proxy) {
    let contacts;
    if (typeOfContact === "contacts") {
      contacts = this.state.user[typeOfContact];
    } else if (typeOfContact === "addedContacts") {
      contacts = this.state[typeOfContact];
    }
    contacts[contacts.indexOf(contact)][proxy.target.name] = proxy.target.value;
    this.setState({
      contacts: contacts
    });
  }

  deleteContact(contact, typeOfContact) {
    let contacts;
    if (typeOfContact === "contacts") {
      contacts = this.state.user[typeOfContact];
    } else if (typeOfContact === "addedContacts") {
      contacts = this.state[typeOfContact];
    }
    contacts.splice(contacts.indexOf(contact), 1);
    this.setState({
      contacts: contacts
    });
  }

  addEmptyContact() {
    let addedContacts = this.state.addedContacts.splice(0);
    addedContacts.push({
      name: '',
      value: ''
    });
    this.setState({
      addedContacts: addedContacts
    });
  }

  changeEditState() {
    if (!this.props.editing) {
      this.setState({
        editClass: 'edit'
      });
      this.props.changeEditState(true);
    } else {
      this.setState({
        editClass: ''
      });
      this.tagsComponent.setInitialState();
      this.props.changeEditState(false);
    }
  }

  saveChanges() {
    if (this.props.editing) {
      let newUser = Object.assign({}, this.state.user);
      // Add addedContacts to user
      let addedContacts = this.state.addedContacts.slice(0);
      addedContacts = addedContacts.filter((contact) => {
        return contact.name !== '' || contact.value !== '';
      });
      newUser.contacts = newUser.contacts.concat(addedContacts);
      this.setState({
        user: Object.assign({}, newUser),
        addedContacts: [{
          name: '',
          value: ''
        }]
      });
      if (newUser.avatar === '/img/avatar.png') {
        newUser.avatar = null;
      } else {
        newUser.avatar = newUser.avatar.split(imgUrl)[1];
      }
      console.log(newUser);
      editUser(localStorage.getItem("token"), newUser).then((res) => {
        this.props.updateUserData(res);
      });
      if (this.tagsComponent.state.tags !== this.props.state.userData.tags) {
        editTags(localStorage.getItem("token"), this.tagsComponent.state.tags);
      }
    }
  }

  render() {
    return (
      <div className="wide block shadow-3 small-12 columns">
        <div className="small-12 medium-4 large-4 columns">
          <div className="img-mask auto-img circle border">
            <img alt="pic" className=""
              src={this.state.previewAvatar === null ? this.state.user.avatar : this.state.previewAvatar} />
            {
              this.props.editing ?
                <div className="img-upload">
                  <p>{this.state.avatarStatus}</p>
                  <input type='file' onChange={this.uploadImage.bind(this)} />
                </div>
                :
                null
            }
          </div>
          <div className="small-12 space-3 columns"></div>
          {
            this.props.ProfileLoaded === true && !this.props.editing ?
              <button className="small-12 small-bg columns" onClick={this.changeEditState.bind(this)}>
                Редактировать</button>
              :
              null
          }
          {
            this.props.editing ?
              <button onClick={
                () => {
                  this.saveChanges.call(this);
                  this.changeEditState.call(this);
                }
              }>Сохранить изменения</button>
              :
              null
          }

        </div>
        <div className="small-12 medium-8 large-8 columns no-padding">
          <div className="properties row">
            {
              this.props.editing ?
                <div>
                  <input type="text" className="small-12 medium-6 property-input active edit"
                    defaultValue={this.state.user.surname}
                    onChange={this.changeItem.bind(this, 'surname')} />
                  <input type="text" className="small-12 medium-6 property-input active edit"
                    defaultValue={this.state.user.name}
                    onChange={this.changeItem.bind(this, 'name')} />
                </div>
                :
                <h2 className="full-name text-center small-12 columns">
                  {this.state.user.name + " " + this.state.user.surname}
                </h2>
            }
            <hr className="medium-rm large-rm" />
            <div className="space-2 small-12 medium-rm large-rm columns" />
            <div className="small-12 medium-6 columns medium-padding-right large-padding-right">
              <div className="property small-12 columns">
                <label className={this.props.editing ? "" : "remove"}
                  htmlFor="institute-sel">Институт</label>
                <i className="material-icons">account_balance</i>
                <select id="institute-sel"
                  className={"property-input " + this.state.editClass}
                  defaultValue={this.state.user.institute}
                  onChange={this.changeItem.bind(this, 'institute')}
                  disabled={!this.props.editing}>
                  <option value="itasu">ИТАСУ</option>
                  <option value="inmin">ИНМИН</option>
                  <option value="ekotekh">ЭКОТЕХ</option>
                  <option value="ibo">ИБО</option>
                </select>
              </div>
              <div className="property small-12 columns">
                <label className={this.props.editing ? "" : "remove"} htmlFor="course-sel">Курс</label>
                <i className="material-icons">school</i>
                <select id="course-sel" className={"property-input " + this.state.editClass}
                  defaultValue={this.state.user.course}
                  onChange={this.changeItem.bind(this, 'course')}
                  disabled={!this.props.editing}>
                  <option value="1">1 курс (бакалавриат)</option>
                  <option value="2">2 курс (бакалавриат)</option>
                  <option value="3">3 курс (бакалавриат)</option>
                  <option value="4">4 курс (бакалавриат)</option>
                  <option value="5">1 курс (магистратура)</option>
                  <option value="6">2 курс (магистратура)</option>
                </select>
              </div>
              <div className="property small-12 columns">
                <label className={this.props.editing ? "" : "remove"} htmlFor="direction-sel">Направление</label>
                <i className="material-icons">my_location</i>
                <input id="direction-sel"
                  type="text"
                  className={"property-input " + this.state.editClass}
                  defaultValue={this.state.user.direction}
                  onChange={this.changeItem.bind(this, 'direction')}
                  disabled={!this.props.editing} />
              </div>
            </div>
            <div className="small-12 medium-6 columns medium-padding-left large-padding-left">
              {
                this.props.user.contacts.length !== 0 || this.props.editing ? <div>Контакты:</div> : null
              }
              {
                this.props.user.contacts.map((contact, index) => {
                  return (
                    <div key={index} className="property small-12 columns">
                      <input type="text"
                        className={"property-input-icon " + this.state.editClass}
                        name="name"
                        defaultValue={contact.name}
                        onChange={this.changeContact.bind(this, contact, "contacts")}
                        disabled={!this.props.editing} />
                      <input type="text"
                        className={"property-input " + this.state.editClass}
                        name="value"
                        defaultValue={contact.value}
                        onChange={this.changeContact.bind(this, contact, "contacts")}
                        disabled={!this.props.editing} />
                      {
                        this.props.editing ?
                          <i className="material-icons property-rm"
                            onClick={this.deleteContact.bind(this, contact, "contacts")}>
                            delete
                                                    </i>
                          :
                          null
                      }
                    </div>
                  )
                })
              }
              {
                this.props.editing ?
                  this.state.addedContacts.map((contact, index) => {
                    return (
                      <div key={index} className="property small-12 columns">
                        <input type="text"
                          className={"property-input-icon " + this.state.editClass}
                          name="name"
                          placeholder="Название контакта"
                          defaultValue={contact.name}
                          onChange={this.changeContact.bind(this, contact, "addedContacts")}
                          disabled={!this.props.editing} />
                        <input type="text"
                          className={"property-input " + this.state.editClass}
                          name="value"
                          placeholder="Значение"
                          defaultValue={contact.value}
                          onChange={this.changeContact.bind(this, contact, "addedContacts")}
                          disabled={!this.props.editing} />
                        <i className="material-icons property-rm"
                          onClick={this.deleteContact.bind(this, contact, "addedContacts")}>
                          delete
                                                </i>
                      </div>
                    )
                  })
                  :
                  null
              }

              {
                this.props.editing ?
                  <button className="small-12 small-bg columns"
                    onClick={this.addEmptyContact.bind(this)}>Добавить</button>
                  :
                  null
              }
            </div>
          </div>
        </div>
        <div className="space-2 small-12 columns" />
        {
          this.props.user.aboutMe || this.props.editing ?
            <div>
              <hr />
              <textarea onChange={this.changeItem.bind(this, 'aboutMe')}
                placeholder="Любая информация о тебе"
                className="description text-center small-12 columns"
                disabled={!this.props.editing}>{this.props.user.aboutMe}</textarea>
            </div>
            :
            null
        }
        <Tags ref={(child) => { this.tagsComponent = child }}
          user={this.props.state.userData}
          editing={this.props.editing}
          editClass={this.state.editClass} />
        <Organisations user={this.props.state.userData} />
      </div>
    )
  }
}

export default connect(
  state => ({
    state: state
  }),
  dispatch => ({
    updateUserData(data) {
      dispatch(userData.updateUser(data))
    }
  })
)(Information);