export class AuthService {
  loggedIn = false;

  isAuthenticated() {

    return new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn);
        }, 15);
      }
    );
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }

}
