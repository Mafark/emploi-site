import { userData } from "../actionCreators";
import { createReducer } from "redux-act";
import { correctImg } from '../common/helpers';

export default createReducer({
  [userData.updateUser]: (state, payload) => {
    let newUserData = Object.assign({}, payload);
    if (newUserData.avatar === null || !newUserData.avatar) {
      newUserData.avatar = '/img/avatar.png';
    } else if (newUserData.avatar !== null || newUserData.avatar) {
      newUserData.avatar = '//emploicore.lod-misis.ru/images/' + newUserData.avatar;
    }
    if (newUserData.portfolio) {
      for (var i = 0; i < newUserData.portfolio.length; i++) {
      newUserData.portfolio[i].avatar = correctImg(newUserData.portfolio[i].avatar);
    }
    }
    //DELL
    if (newUserData.contacts === null) {
      newUserData.contacts = [];
    }
    if (newUserData.organizations === null) {
      newUserData.organizations = [];
    }
    if (newUserData.portfolio === null) {
      newUserData.portfolio = [];
    }
    //DELL
    return newUserData;
  }
}, { loaded: false });
