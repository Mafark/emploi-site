import {combineReducers} from 'redux';
import userData from './userData';
import search from './search/search';
import homePage from './homePage/homePage';

export default combineReducers({
    userData,
    search,
    homePage
})