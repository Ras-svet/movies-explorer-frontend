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
						<div className="main">
							<Login />
						</div>
					} />
					<Route exact path="/signup" element={
						<div className="main">
							<Register />
						</div>
					} />
					<Route exact path="/profile" element={
						<>
							<Header isLoggedIn={true}/>
							<div className="main">
								<Profile />
							</div>
						</>
					} />
					<Route exact path="/movies" element={
						<>
							<Header isLoggedIn={true} />
							<div className="main">
								<Movies cards={cards}/>
							</div>
							<Footer />
						</>
					} />
					<Route exact path="/saved-movies" element={
						<>
							<Header isLoggedIn={true} />
							<div className="main">
								<Movies cards={savedCards} />
							</div>
							<Footer />
						</>
					}/>
					<Route exact path="/" element={
						<>
							<Header isLoggedIn={false} />
							<div className="main">
								<Main />
							</div>
							<Footer />
						</>
					} />

					<Route path="*" element={
						<div className="main">
							<NotFound />
						</div>
					} />
				</Routes>
			</div>
		</div>
	)
}

export default App;