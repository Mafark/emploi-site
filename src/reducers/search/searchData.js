import {search} from "../../actionCreators";
import {createReducer} from "redux-act";

export default createReducer({
    [search.pushData]: (state, payload) => [...state, ...payload],
    [search.updateData]: (state, payload) => [...payload]
}, []);