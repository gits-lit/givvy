import { ADD_ITEM, REMOVE_ITEM, CLEAR_ITEMS } from '../actions/types';

const initialState = {
  items: []
};

const ItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
      };
    case REMOVE_ITEM:
      return {
        ...state,
      };
    case CLEAR_ITEMS:
      return {
        items: [],
        ...state,
      };
    default:
      return state;
  }
};

export default ShelterReducer;