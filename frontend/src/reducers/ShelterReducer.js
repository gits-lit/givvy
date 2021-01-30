import { GET_SHELTERS } from '../actions/types';

const initialState = {
};

const ShelterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SHELTERS:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default ShelterReducer;