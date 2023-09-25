// Redux Actions Format
export const login = (user) => ({
  type: 'LOGIN',
  payload: user,
});

export const signUp = (user) => ({
  type: 'SIGN_UP',
  payload: user,
});

export const logout = () => ({
  type: 'LOGOUT',
});

// Blog Actions Format
export const addBlogPost = (post) => ({
  type: 'ADD_BLOG_POST',
  payload: post,
});

export const deleteBlogPost = (postId) => ({
  type: 'DELETE_BLOG_POST',
  payload: postId,
});

// Chat Actions Format
export const sendMessage = (message) => ({
  type: 'SEND_MESSAGE',
  payload: message,
});
