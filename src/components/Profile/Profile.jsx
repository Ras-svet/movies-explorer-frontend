import React from "react";
import "./Profile.css";
// import { Link } from "react-router-dom";
import mainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Profile(props) {
	const [isEdit, setIsEdit] = React.useState(false)
	const currentUser = React.useContext(CurrentUserContext);
	const [email, setEmail] = React.useState('');
	const [name, setName] = React.useState('');
	const [isActive, setIsActive] = React.useState(false);
	const [error, setError] = React.useState('');
	const [isSucces, setIsSucces] = React.useState(false)
	// console.log(currentUser, currentUser.name)

	function handleEdit() {
		setIsEdit(true)
	}

	function handleSudmit(evt) {
		console.log("tut1")
		evt.preventDefault()
		console.log(name, email)
		updateUserInfo(name, email)
	}

	function updateUserInfo(name, email) {
		console.log(name, email)
		mainApi.updateUserInfo(name, email)
		.then((user) => {
			setError('')
			setIsSucces(true)
			props.setCurrentUser({
				_id: user._id,
				name: user.name,
				email: user.email,
			})
			setIsEdit(false)
		})
		.catch((err) => {
			console.log(err)
			if (err === 500) {
				setError("Пользователь с указанным email уже существует")
			} else if (err === 401) {
				props.logOut()
			} else {
				setError("При обновление профиля произошла ошибка")
			}
		})
	}

	function handleChangeName(evt) {
		setName(evt.target.value)
		if (evt.target.value.length < 3 || evt.target.value.length > 32) {
			setError("Имя должно быть больше 3 символов и меньше 32")
		}
		else {
			setError('')
		}
	}

	function handleChangeEmail(evt) {
		setEmail(evt.target.value)
		const reg = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
		if (!reg.test(evt.target.value)) {
			setError("Введите корректный email формата example@domain.ru")
		}
		else {
			setError('')
		}
	}

	React.useEffect(() => {
		if (error) {
			setIsActive(false)
		} else if (currentUser.name === name && currentUser.email === email){
			setIsActive(false)
		} else {
			setIsActive(true)
		}
	}, [error, name, email])

	React.useEffect(() => {
		setEmail(currentUser.email)
		setName(currentUser.name)
	}, [currentUser.name, currentUser.email])

	// React.useEffect(() => {
	// 	console.log(name)
	// }, [name])

	return (
		<div className="profile">
			<h1 className="profile__welcome">Привет, {currentUser.name}!</h1>
			<form className="profile__edit">
				<div className="profile__info">
					<h2 className="profile__info-label">Имя</h2>
					{isEdit? <input className="profile__info-data" defaultValue={currentUser.name} onChange={handleChangeName}></input> : <p className="profile__info-data">{currentUser.name}</p>}
				</div>
				<div className="profile__info">
					<h2 className="profile__info-label">E-mail</h2>
					{isEdit? <input className="profile__info-data" defaultValue={currentUser.email} onChange={handleChangeEmail}></input> : <p className="profile__info-data">{currentUser.email}</p>}
				</div>
				{isEdit
				? <>
						<span className="profile__error">{error}</span>
						<button disabled={!isActive} type="button" className={`profile__button-save ${isActive ? '' : 'profile__button-save_disable'}`} onClick={handleSudmit}>Сохранить</button> 
					</>
				: <nav>
						<ul className="profile__buttons">
							<span className="profile__allgood">{isSucces ? 'Данные успешно изменены' : ''}</span>
							<li className="profile__button profile__button-edit" onClick={handleEdit}>Редактировать</li>
							<li className="profile__button profile__button-exit" onClick={props.logOut}>Выйти из аккаунта</li>
						</ul>
					</nav>}
			</form>
		</div>
	)
}

export default Profile;