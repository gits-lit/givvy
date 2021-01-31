import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import ItemsReducer from './ItemsReducer';
import ShelterReducer from './ShelterReducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    shelters: ShelterReducer,
    items: ItemsReducer
  });