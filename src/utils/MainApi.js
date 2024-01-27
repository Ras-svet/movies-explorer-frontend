export class MainApi {
	constructor({url, headers}) {
		this._url = url;
		this._headers = headers;
	}

	_checkResponse(response) {
		return response.ok ? response.json() : response.json().then(errData => Promise.reject(errData))
	}

	_checkResponseStatus(response) {
		if (response.ok) {
			return response.json();
		}
		return Promise.reject(response.status);
	}

	signUp(name, email, password) {
		console.log(this._url)
		return fetch(`${this._url}/signup`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify({ name, email, password }),
		}).then(this._checkResponse)
	}

	signIn(email, password) {
		return fetch(`${this._url}/signin`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify({ email, password }),
		}).then(this._checkResponse)
	}

	_getAuth() {
		const jwt = localStorage.getItem('jwt');
		return {
			'Authorization': `Bearer ${jwt}`,
			...this._headers,
		};
	}

	getUserInfo() {
		return fetch(`${this._url}/users/me`, {
			headers: this._getAuth()
		}).then(this._checkResponse)
	}

	updateUserInfo(name, email) {
		return fetch(`${this._url}/users/me`, {
			method: "PATCH",
			headers: this._getAuth(),
			body: JSON.stringify({ name, email }),
		}).then(this._checkResponseStatus)
	}

	addSavedFilm(film) {
		return fetch(`${this._url}/movies`, {
			method: "POST",
			headers: this._getAuth(),
			body: JSON.stringify({
				"country": film.country,
				"director": film.director,
				"duration": film.duration,
				"year": film.year,
				"description": film.description,
				"image": `https://api.nomoreparties.co${film.image.url}`,
				"trailerLink": film.trailerLink,
				"thumbnail": `https://api.nomoreparties.co${film.image.formats.thumbnail.url}`,
				"movieId": film.id,
				"nameRU": film.nameRU,
				"nameEN": film.nameEN,
			}),
		}).then(this._checkResponse)
	}

	deleteSavedFilm(filmId) {
		return fetch(`${this._url}/movies/${filmId}`, {
			method: "DELETE",
			headers: this._getAuth(),
		}).then(this._checkResponse)
	}

	getSavedFilms() {
		return fetch(`${this._url}/movies`, {
			method: "GET",
			headers: this._getAuth(),
		}).then(this._checkResponse)
	}
}

const mainApi = new MainApi({
	url: 'https://api.rasmovie.nomoredomainsmonster.ru',
	headers: {
		'Content-Type': 'application/json'
	}
})

export default mainApi;