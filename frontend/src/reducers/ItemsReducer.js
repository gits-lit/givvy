import { ADD_ITEM, REMOVE_ITEM, CLEAR_ITEMS } from '../actions/types';
import category from '../assets/category.json';

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
      const itemCategory = category[action.payload.toLowerCase()] || 'other';
      console.log(itemCategory);
      return {
        ...state,
        items: [...state.items, [action.payload, 1, itemCategory]]
      };
    case REMOVE_ITEM:
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i][0] === action.payload) {
          const items = state.items.slice();
          items.splice(i, 1);
          return {
            ...state,
            items: items,
          };
        }
      }
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