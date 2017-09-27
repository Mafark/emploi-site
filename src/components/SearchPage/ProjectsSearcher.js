import { connect } from 'react-redux';
import { getTagsByString } from '../../common/ajaxRequests';
import SearchPage from './SearchPage';
import { search } from '../../actionCreators';

class Search extends SearchPage {
  componentWillMount() {
    super.componentWillMount();
    // If user is authorized, to add the selected tags from the profile
    let userTags = this.props.state.userData.tags;
    if (userTags) {
      this.props.updateSearchSelectedTags(userTags);
    }
  }

  getPopularTags() {
    getTagsByString();
  }
}
export default connect(
  state => ({
    state: state
  }),
  dispatch => ({
    changeSearchState: searchState => {
      dispatch({ type: 'UPDATE_SEARCH_STATE', searchState: searchState });
    },
    changeSearchString: str => {
      dispatch(search.updateString(str));
    },
    updateSearchData: data => {
      dispatch(search.updateData(data));
    },
    updateSearchTags: tags => {
      dispatch(search.updateTags(tags));
    },
    updateSearchSelectedTags: tags => {
      dispatch(search.updateSelectedTags(tags));
    }
  })
)(Search);
