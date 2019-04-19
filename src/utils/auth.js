export function loginIn(user, token) {
  localStorage.setItem("userName",user);
  localStorage.setItem('token', token);
}

export function isLogin() {
  if (localStorage.getItem('userName')) {
    return true
  } else {
    return false
  }
}
export function loginOut() {
  localStorage.removeItem('userName');
  localStorage.removeItem('token');
}
