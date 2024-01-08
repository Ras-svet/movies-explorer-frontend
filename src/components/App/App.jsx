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
import cards from "../../utils/cards";
import savedCards from "../../utils/savedCards";

function App(){
	const navigate = useNavigate();
	return (
		<div className="body">
			<div className="page">
				<Routes>
					<Route exact path="/signin" element={
						<main className="main">
							<Login />
						</main>
					} />
					<Route exact path="/signup" element={
						<main className="main">
							<Register />
						</main>
					} />
					<Route exact path="/profile" element={
						<>
							<Header isLoggedIn={true}/>
							<main className="main">
								<Profile />
							</main>
						</>
					} />
					<Route exact path="/movies" element={
						<>
							<Header isLoggedIn={true} />
							<main className="main">
								<Movies cards={cards}/>
							</main>
							<Footer />
						</>
					} />
					<Route exact path="/saved-movies" element={
						<>
							<Header isLoggedIn={true} />
							<main className="main">
								<Movies cards={savedCards} />
							</main>
							<Footer />
						</>
					}/>
					<Route exact path="/" element={
						<>
							<Header isLoggedIn={false} />
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
			</div>
		</div>
	)
}

export default App;