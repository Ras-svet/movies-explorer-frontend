import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";

function Profile(props) {
	const [isEdit, setIsEdit] = React.useState(false)

	function handleEdit() {
		setIsEdit(true)
	}

	function handleSave() {
		setIsEdit(false)
	}

	return (
		<div className="profile">
			<h1 className="profile__welcome">Привет, Виталий!</h1>
			<form className="profile__edit">
				<div className="profile__info">
					<h2 className="profile__info-label">Имя</h2>
					{isEdit? <input className="profile__info-data" defaultValue="Виталий"></input> : <p className="profile__info-data">Виталий</p>}
				</div>
				<div className="profile__info">
					<h2 className="profile__info-label">E-mail</h2>
					{isEdit? <input className="profile__info-data" defaultValue="pochta@yandex.ru"></input> : <p className="profile__info-data">pochta@yandex.ru</p>}
				</div>
				{isEdit
				? <button type="button" className="profile__button-save">Сохранить</button> 
				: <nav>
						<ul className="profile__buttons">
							<li className="profile__button profile__button-edit" onClick={handleEdit}>Редактировать</li>
							<Link to="/signin" className="profile__button"><li className="profile__button-exit">Выйти из аккаунта</li></Link>
						</ul>
					</nav>}
			</form>
		</div>
	)
}

export default Profile;