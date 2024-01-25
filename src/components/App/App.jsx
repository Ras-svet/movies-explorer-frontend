import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from "../Enter/Login/Login";
import Register from "../Enter/Register/Register";
import './App.css'
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import NotFound from "../NotFound/NotFound";
import mainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute";
import api from "../../utils/MoviesApi";
import PopupConfirm from "../PopupConfirm/PopupConfirm";
import goodAnswer from '../../images/AllRight.svg'
import badAnswer from '../../images/OhBad.svg'

function App(){
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = useState({
		_id: '',
		name: '',
		email: '',
	});
	const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem('jwt') ? true : false);
	const [savedFilms, setSavedFilms] = React.useState([]);
	const [allFilms, setAllFilms] = React.useState([]);
	const [isPopupOpen, setIsPopupOpen] = React.useState(false);
	const [titleStatusPopup, setTitleStatusPopup] = React.useState('');
	const [imageStatusPopup, setImageStatusPopup] = React.useState(null);

	function signUp(name, email, password) {
		mainApi.signUp(name, email, password)
		.then(() => {
			setIsPopupOpen(true)
			setImageStatusPopup(goodAnswer);
			setTitleStatusPopup("Вы успешно зарегистрировались")
			signIn(email, password)
		})
		.catch((err) => {
			console.log(err.message)
			setIsPopupOpen(true)
			setImageStatusPopup(badAnswer);
			setTitleStatusPopup("Что-то пошло не так")
		})
	}

	function closePopup() {
		setIsPopupOpen(false)
	}

	function signIn(email, password) {
		mainApi.signIn(email, password)
		.then(({token}) => {
			localStorage.setItem('jwt', token);
			setIsLoggedIn(true)
			getUserInfo()
		})
		.then(() => {
			navigate('/movies');
		})
		.catch((err) => console.log(err))
	}

	function getUserInfo() {
		mainApi.getUserInfo()
		.then((user) => {
			setCurrentUser({
				_id: user._id,
				name: user.name,
				email: user.email,
			})
		})
		.catch((err) => console.log(err))
	}

	function logOut() {
		setCurrentUser({
			_id: '',
			name: '',
			email: '',
		});
		localStorage.clear();
		navigate("/");
		window.location.reload();
	}

	function deleteSavedFilm(filmId) {
		mainApi.deleteSavedFilm(filmId)
		.then((res) => {
			const newSavedFilms = savedFilms
			.filter((savedfilm) => savedfilm._id !== filmId);
			setSavedFilms(newSavedFilms);
		})
		.catch((err) => console.log(err))
	}

	function addSavedFilm(film) {
		mainApi.addSavedFilm(film)
		.then(() => {
			getSavedFilms()
		})
		.catch((err) => console.log(err))
	}

	function getAllFilms() {
		api.getAllMovies()
		.then((res) => {
			setAllFilms(res)
		})
		.catch((err) => console.log(err))
	}

	function getSavedFilms() {
		mainApi.getSavedFilms()
		.then((res) => {
			setSavedFilms(res)
		})
		.catch((err) => console.log(err))
	}

	React.useEffect(() => {
		if (localStorage.getItem('jwt')) {
			getUserInfo()
			getAllFilms()
			getSavedFilms()
		}
	}, [isLoggedIn])

	return (
		<>
			<CurrentUserContext.Provider value={currentUser}>
				<div className="body">
					<div className="page">
						<Routes>
							<Route exact path="/signin" element={
								<main className="main">
									<Login onSubmit={signIn} />
								</main>
							} />
							<Route exact path="/signup" element={
								<main className="main">
									<Register onSubmit={signUp} />
								</main>
							} />
							<Route exact path="/profile" element={
								<>
									<Header isLoggedIn={true}/>
									<main className="main">
										<ProtectedRoute
											component={Profile}
											logOut={logOut}
											setCurrentUser={setCurrentUser}
											isLoggedIn={isLoggedIn}
											close={closePopup}
										/>
									</main>
								</>
							} />
							<Route exact path="/movies" element={
								<>
									<Header isLoggedIn={true} />
									<main className="main">
										<ProtectedRoute
											component={Movies}
											cards={allFilms}
											isLoggedIn={isLoggedIn}
											add={addSavedFilm}
											delete={deleteSavedFilm}
											savedFilms={savedFilms}
										/>
									</main>
									<Footer />
								</>
							} />
							<Route exact path="/saved-movies" element={
								<>
									<Header isLoggedIn={true} />
									<main className="main">
										<ProtectedRoute
											component={Movies}
											cards={savedFilms}
											isLoggedIn={isLoggedIn}
											delete={deleteSavedFilm}
											/>
									</main>
									<Footer />
								</>
							}/>
							<Route exact path="/" element={
								<>
									<Header isLoggedIn={isLoggedIn} />
									<main className="main">
										<Main />
									</main>
									<Footer />
								</>
							} />

							<Route path="*" element={
								<main className="main">
									<NotFound />
								</main>
							} />
						</Routes>
						<PopupConfirm
						isOpen={isPopupOpen}
						onClose={closePopup}
						title={titleStatusPopup}
						image={imageStatusPopup}
					/>
					</div>
				</div>
			</CurrentUserContext.Provider>
		</>
		
	)
}

export default App;