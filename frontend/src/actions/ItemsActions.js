import { REMOVE_ITEM, CLEAR_ITEMS } from './types';

export const removeItem = (name) => async dispatch => {
  dispatch({
    type: REMOVE_ITEM,
    payload: name
  });
}

export const clearItems = () => {

}