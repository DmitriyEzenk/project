export function getToken() {
  const cookie = document.cookie;
  if (!cookie) {
    return undefined;
  }
  const tokenString = cookie.slice('; ');
  return tokenString.replace('token=', '');
}

export function setToken(tokenResponce) {
  document.cookie = `token=${tokenResponce}; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT`;
}

export function removeToken() {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}
