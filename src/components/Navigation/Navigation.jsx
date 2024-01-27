import React from "react"
import "./Navigation.css"
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import profileButton from "../../images/profileButton.svg"
import { useLocation } from "react-router-dom";

function Navigation(props) {
	const {pathname} = useLocation()
	return (
		<div className="navigation">
			<button type="button" className="navigation__close-button" onClick={props.onClose}></button>
			<nav className="navigation__container">
				<ul className="navigation__links">
					<li>
						<NavLink
							to="/"
							className={`navigation__link ${pathname === '/' ? 'navigation__link_active' : ''}`}>
							Главная
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/movies"
							className={`navigation__link ${pathname === '/movies' ? 'navigation__link_active' : ''}`}>
							Фильмы
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/saved-movies"
							className={`navigation__link ${pathname === '/saved-movies' ? 'navigation__link_active' : ''}`}>
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