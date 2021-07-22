export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.jwt) {
      // for Node.js Express back-end
      return { Authorization: 'Bearer ' + user.jwt };
    } else {
      return {};
    }
}  