class Api {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}

	getUserData() {
		return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			});
	}

	getServerCards() {
		return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			});
	}

	createCard(cardTitle, cardUrl) {
		return fetch(`${this._baseUrl}/cards`,
			{
				headers: this._headers,
				method: 'POST',
				body: JSON.stringify({
					name: cardTitle,
					link: cardUrl
				})
			})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			});
	}

	changeLikeCardStatus(cardId, isLiked) {
		return fetch(`${this._baseUrl}/cards/likes/${cardId}`,
			{
				headers: this._headers,
				method: `${isLiked ? 'PUT' : 'DELETE'}`,
			})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			});
	}

	editProfile(name, job) {
		return fetch(`${this._baseUrl}/users/me`,
			{
				headers: this._headers,
				method: 'PATCH',
				body: JSON.stringify({
					name: name,
					about: job
				})
			})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			});
	}

	deleteCard(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}`,
			{
				headers: this._headers,
				method: 'DELETE',
			})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			});
	}

	changeAvatar(link) {
		return fetch(`${this._baseUrl}/users/me/avatar`,
			{
				headers: this._headers,
				method: 'PATCH',
				body: JSON.stringify({
					avatar: link,
				})
			})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			});
	}
}

export const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
	headers: {
		'authorization': '82766c49-7200-46d6-b92c-89ba083f974b',
		'Content-Type': 'application/json'
	}
})
