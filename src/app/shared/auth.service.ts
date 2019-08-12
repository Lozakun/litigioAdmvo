export class AuthService {
    loggedIn = false;

    isAuthenticated() {
        const promise = new Promise((res, rej) => {
            setTimeout(() => {
                res(this.loggedIn);
            }, 800);
            console.log(this.loggedIn);
        });
        return promise;
    }

    login() {
        this.loggedIn = true;
    }
    logout() {
        this.loggedIn = false;
    }
}
