import {connect} from 'react-redux';
import {getStudentsSearchPreview} from '../../common/ajaxRequests';
import SearchPage from './SearchPage';
import {search} from '../../actionCreators';

class Search extends SearchPage {
    getPopularTags() {
        this.props.updateSearchTags(getStudentsSearchPreview().tags);
    }
}
export default connect(
    state => ({
        state: state
    }),
    dispatch => ({
        changeSearchState: (searchState) => {
            dispatch({type: 'UPDATE_SEARCH_STATE', searchState: searchState});
        },
        changeSearchString: (str) => {
            dispatch(search.updateString(str));
        },
        updateSearchData: (data) => {
            dispatch(search.updateData(data));
        },
        updateSearchTags: (tags) => {
            dispatch(search.updateTags(tags))
        },
        updateSearchSelectedTags: (tags) => {
            dispatch(search.updateSelectedTags(tags))
        }
    })
)(Search);