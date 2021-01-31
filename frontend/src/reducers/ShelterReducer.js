import { GET_SHELTERS, RANK_SHELTERS } from '../actions/types';

const initialState = {
  shelters: {},
  ranking: []
};

const ShelterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SHELTERS:
      console.log(action.payload);
      return {
        ...state,
        shelters: action.payload
      };
    case RANK_SHELTERS:
      console.log(action.payload);
      const newRanking = []
      for (let i = 0; i < 10; i++) {
        newRanking.push([action.payload[i].name, action.payload[i].type, action.payload[i].needs]);
      }
      console.log(newRanking);
        return {
          ...state,
          ranking: newRanking
        };
    default:
      return state;
  }
};

export default ShelterReducer;