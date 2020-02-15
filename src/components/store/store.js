import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  users: [],
  messages: []
};

const reducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case 'ADD_MSG':
      newState.messages.push(action.data);
      break;
    default:
      break;
  }

  return newState;
};

export default createStore(reducer, applyMiddleware(thunk));
