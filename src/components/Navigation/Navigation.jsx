import React from "react"
import "./Navigation.css"
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import profileButton from "../../images/profileButton.svg"

function Navigation(props) {
	return (
		<div className="navigation">
			<button className="navigation__close-button" onClick={props.onClose}></button>
			<nav className="navigation__container">
				<ul className="navigation__links">
					<li>
						<NavLink
							to="/"
							className="navigation__link">
							Главная
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/movies"
							className="navigation__link navigation__link_active">
							Фильмы
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/saved-movies"
							className="navigation__link">
							Сохранённые фильмы
						</NavLink>
					</li>
				</ul>
				<Link to="/profile" className="navigation__profile"><p className="navigation__profile-text">Аккаунт</p><img src={profileButton} className="navigation__profile-icon" alt="иконка личного кабинета"></img></Link>
			</nav>
		</div>
	)
}

export default Navigation;