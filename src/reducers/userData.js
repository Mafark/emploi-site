import {userData} from "../actionCreators";
import {createReducer} from "redux-act";

export default createReducer({
    [userData.updateUser]: (state, payload) => {
        let newUserData = Object.assign({}, payload);
        if (newUserData.avatar === null || !newUserData.avatar) {
            newUserData.avatar = '/img/avatar.png';
        } else if (newUserData.avatar !== null || newUserData.avatar) {
            newUserData.avatar = '//emploicore.lod-misis.ru/images/' + newUserData.avatar;
        }
        //DELL
        if (newUserData.contacts === null) {
            newUserData.contacts = [];
        }
        if (newUserData.organizations === null) {
            newUserData.organizations = [];
        }
        if (newUserData.portfolio === null) {
            newUserData.portfolio = [];
        }
        //DELL
        return newUserData;
    }
}, {loaded: false});
