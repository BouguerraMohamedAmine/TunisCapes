// reducer.js

const initialState = {
  count: 0,
  user: null, // Initialize user to null
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'LOGIN':
      return { ...state, user: action.payload }; // Save user data in the state
    case 'SIGN_UP':
      return { ...state, user: action.payload }; // Save user data in the state
    case 'LOGOUT':
      return { ...state, user: null }; // Clear the user data when logging out
    default:
      return state;
  }
};

export default counterReducer;
