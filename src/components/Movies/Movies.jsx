import React from "react";
import "./Movies.css"
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies(props) {
	return (
		<div className="movies">
			<div className="movies__container">
			<SearchForm />
			<MoviesCardList cards={props.cards}/>
			</div>
		</div>
	)
}

export default Movies;