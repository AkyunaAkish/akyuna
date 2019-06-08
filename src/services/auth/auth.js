import axios from 'axios';

class AuthService {
	static redirectIfNotLoggedIn(history) {
		try {
			// can't get session
			if (!window.sessionStorage.getItem('session')) {
				window.sessionStorage.clear();
				history.push('/auth/login');
			} else {
				this.verifyToken()
					.then(result => {
						if (result.error) {
							// if token/session is invalid, clear the session and redirect the user to the login page
							window.sessionStorage.clear();
							history.push('/auth/login');
						}
					})
					.catch(err => {
						window.sessionStorage.clear();
						history.push('/auth/login');
					});
			}
		} catch (exception) {
			console.log('sessionStorage exception', exception);
		}
	}

	static redirectIfNotAdmin(history) {
		return new Promise((resolve, reject) => {
			try {
				axios
					.post('/api/auth/verify-admin', {
						session: JSON.parse(window.sessionStorage.getItem('session')),
					})
					.then(({ data }) => {
						if (!data) {
							history.push('/');
							resolve(false);
						}

						if (data.error && data.error === 'not logged in') {
							history.push('/auth/login');
							resolve(false);
						} else {
							resolve(true);
						}
					})
					.catch(err => {
						history.push('/');
						resolve(false);
					});
			} catch (err) {
				console.log('sessionStorage err', err);
				history.push('/');
				resolve(false);
			}
		});
	}

	static verifyToken() {
		return new Promise((resolve, reject) => {
			try {
				axios
					.post('/api/auth/verify-token', {
						session: JSON.parse(window.sessionStorage.getItem('session')),
					})
					.then(({ data }) => {
						resolve(data);
					})
					.catch(err => {
						reject(err);
					});
			} catch (err) {
				console.log('sessionStorage err', err);
			}
		});
	}

	static signOut(history) {
		try {
			window.sessionStorage.clear();
			history.push('/');
		} catch (exception) {
			console.log('sessionStorage exception', exception);
			return exception;
		}
	}
}

export default AuthService;
