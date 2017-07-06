import store from '../store';
import { browserHistory } from 'react-router';
import { userData } from '../actionCreators';
import { site, imgUrl } from './ajaxRequests';

export const defaultImg = '/img/avatar.png'

export function logOut(e) {
  e.preventDefault();
  if (confirm('Вы уверены, что хотите выйти?')) {
    browserHistory.push('/');
    store.dispatch(userData.updateUser({}));
    localStorage.removeItem('token');
  }
}

export function correctImg(nameOfImg) {
  if (nameOfImg === null || !nameOfImg) {
    return '/img/avatar.png';
  } else if (nameOfImg !== null || nameOfImg) {
    return imgUrl + nameOfImg;
  }
}