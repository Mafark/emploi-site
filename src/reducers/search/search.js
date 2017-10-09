import { combineReducers } from 'redux';
import searchString from './searchString';
import searchData from './searchData';
import searchTags from './searchTags';
import searchSelectedTags from './searchSelectedTags';
import searchConfig from './searchConfig';

export default combineReducers({
  searchString,
  searchData,
  searchTags,
  searchSelectedTags,
  searchConfig
});
