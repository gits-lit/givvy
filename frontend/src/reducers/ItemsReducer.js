import { ADD_ITEM, REMOVE_ITEM, CLEAR_ITEMS } from '../actions/types';

const initialState = {
  items: []
};

const ItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      console.log('ADD ITEM');
      console.log(state.items);
      for (let i = 0; i < state.items.length; i++) {
        console.log(state.items[i]);
        if (state.items[i][0] === action.payload) {
          const items = state.items.slice();
          items[i][1] += 1;
          console.log('already have apples');
          return {
            ...state,
            items: items,
          };
        }
      }
      console.log('adding apples');
      return {
        ...state,
        items: [...state.items, [action.payload, 1]]
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

export default ItemsReducer;