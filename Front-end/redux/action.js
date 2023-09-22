export const login = (user) => ({
    type: 'LOGIN',
    payload: user,
  });

  export const signUp = (user) => ({
    type: 'SIGN_UP',
    payload: user,
  });
