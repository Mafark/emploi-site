import {search} from "../../actionCreators";
import {createReducer} from "redux-act";

export default createReducer({
    [search.updateConfig]: (state, payload) => payload
}, {});