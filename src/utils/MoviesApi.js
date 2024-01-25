export class Api {
	constructor() {
		this._url = 'https://api.nomoreparties.co/beatfilm-movies';
	}

	_checkResponse(response) {
		if (response.ok) {
			console.log(response.json)
			return response.json();
		}
		return Promise.reject(`Ошибка: ${response.status}`)
	}

	getAllMovies() {
		return fetch(`${this._url}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		}).then(this._checkResponse)
	}
}

const api = new Api()

export default api;