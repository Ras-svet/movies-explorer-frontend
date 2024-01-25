import React from "react"
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";
import profileButton from "../../images/profileButton.svg"
import "./Header.css"
import Navigation from "../Navigation/Navigation";
import { useLocation } from "react-router-dom";

function Header(props) {
	const {pathname} = useLocation()
	const [isNavigationOpen, setIsNavigationOpen] = React.useState(false)

	function handleOpenNavigation() {
		setIsNavigationOpen(true)
	}

	function handleCloseNavigation() {
		setIsNavigationOpen(false)
	}

	return (
		<>
			{props.isLoggedIn ? (
			<header className="header">
				<div className="header__info">
					<Link to="/" className="header__logo"><img src={logo} alt="логотип" /></Link>
						<nav>
							<ul className="header__links">
								<li>
									<NavLink
										to="/movies"
										className={`header__link ${pathname === '/movies' ? 'header__link_active' : ''}`}>
										Фильмы
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/saved-movies"
										className={`header__link ${pathname === '/saved-movies' ? 'header__link_active' : ''}`}>
										Сохранённые фильмы
									</NavLink>
								</li>
							</ul>
						</nav>
					</div>
					<Link to="/profile" className="header__profile"><p className="header__profile-text">Аккаунт</p><img src={profileButton} className="header__profile-icon" alt="иконка личного кабинета"></img></Link>
					<button type="button" className="header__burger" onClick={handleOpenNavigation}></button>
					{isNavigationOpen && <Navigation onClose={handleCloseNavigation}/>}
				</header>)
				: (
					<header className="header header-landing">
						<div className="header__info">
							<Link to="/" className="header__logo"><img src={logo} alt="логотип" /></Link>
						</div>
						<nav className="header__nav-noauth">
							<NavLink to="/signup" className="header__link">Регистрация</NavLink>
							<Link to="/signin" className="header__button-signin">Войти</Link>
						</nav>
					</header>
				)}
		</>
		
	)
}

export default Header;