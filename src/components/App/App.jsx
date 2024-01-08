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
						<Login />
					} />
					<Route exact path="/signup" element={
						<Register />
					} />
					<Route exact path="/profile" element={
						<>
							<Header isLoggedIn={true}/>
							<Profile />
						</>
					} />
					<Route exact path="/movies" element={
						<>
							<Header isLoggedIn={true} />
							<Movies cards={cards}/>
							<Footer />
						</>
					} />
					<Route exact path="/saved-movies" element={
						<>
							<Header isLoggedIn={true} />
							<Movies cards={savedCards} />
							<Footer />
						</>
					}/>
					<Route exact path="/" element={
						<>
							<Header isLoggedIn={false} />
							<Main />
							<Footer />
						</>
					} />

					<Route path="*" element={
						<NotFound />
					} />
				</Routes>
			</div>
		</div>
	)
}

export default App;