import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    confirmMsg: '',
    okClicked: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SHOW_CONFIRM:
            return updateObject(state, { confirmMsg: action.confirmMsg });
        case actionTypes.HIDE_CONFRIM:
            return updateObject(state, { confirmMsg: '' });
        case actionTypes.OK_CLICKED:
            return updateObject(state, { confirmMsg: '', okClicked: action.okClicked });
        default:
            return state;
    }
}

export default reducer;