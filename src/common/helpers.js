import store from '../store';
import { browserHistory } from 'react-router';
import { userData } from '../actionCreators';
import { site, imgUrl, logOut as logOutAjax } from './ajaxRequests';

export const defaultImg = '/img/avatar.png';

export function logOut(e) {
  e.preventDefault();
  if (confirm('Вы уверены, что хотите выйти?')) {
    logOutAjax();
    browserHistory.push('/');
    store.dispatch(userData.updateUser({}));
    localStorage.removeItem('token');
  }
}

export function correctImg(nameOfImg) {
  if (nameOfImg === null || !nameOfImg || nameOfImg === '') {
    return '/img/avatar.png';
  } else if (nameOfImg !== null || nameOfImg) {
    return imgUrl + nameOfImg;
  }
}

export function correctImgToSend(nameOfImg) {
  if (nameOfImg === '/img/avatar.png') {
    nameOfImg = null;
  } else if (nameOfImg.indexOf(imgUrl) + 1) {
    nameOfImg = nameOfImg.split(imgUrl)[1];
  }
  return nameOfImg;
}
