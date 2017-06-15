import {createAction} from "redux-act";

export const userData = {
    updateUser: createAction('UPDATE_USER')
};

export const search = {
    updateString: createAction('UPDATE_SEARCH_STRING'),
    pushData: createAction('PUSH_SEARCH_DATA'),
    updateData: createAction('UPDATE_SEARCH_DATA'),
    updateConfig: createAction('UPDATE_SEARCH_CONFIG'),
    updateSelectedTags: createAction('UPDATE_SEARCH_SELECTED_TAGS'),
    updateTags: createAction('UPDATE_SEARCH_TAGS')
};

export const homePage = {
    updateRegBlockState: createAction('UPDATE_REG_BLOCK_STATE')
};