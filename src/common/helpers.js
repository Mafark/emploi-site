import store from '../store';
import {browserHistory} from 'react-router';
import {userData} from '../actionCreators';

export function logOut(e) {
    e.preventDefault();
    if(confirm('Вы уверены, что хотите выйти?')){
        browserHistory.push('/');
        store.dispatch(userData.updateUser({}));
        localStorage.removeItem('token');
    }
}