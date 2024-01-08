import React from "react";
import "./SearchForm.css"
import search from "../../images/search.svg"
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
	return (
		<div className="search">
			<form className="search__form">
				<div className="search__input-area">
					<img src={search} className="search__input-icon" alt="иконка поиска" />
					<input className="search__input" placeholder="Фильм" />
					<button type="submit" className="search__input-button">Найти</button>
				</div>
				<FilterCheckbox />
			</form>
		</div>
	)
}

export default SearchForm;