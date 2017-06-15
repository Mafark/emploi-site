import {homePage} from "../../actionCreators";
import {createReducer} from "redux-act";

export default createReducer({
    [homePage.updateRegBlockState]: (state, payload) => payload
}, false);