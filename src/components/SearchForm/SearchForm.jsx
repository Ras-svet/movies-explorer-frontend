import React from "react";
import "./SearchForm.css"
import search from "../../images/search.svg"
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";

function SearchForm(props) {
	const [word, setWord] = React.useState('')
	const [isSearchShort, setIsSearchShort] = React.useState()
	const {pathname} = useLocation()

	function getAttribute(attribute) {
		setIsSearchShort(attribute)
		props.handleSearch(word, attribute)
	}

	function handleChangeWord(evt) {
		setWord(evt.target.value)
		if (pathname === "/movies") {
			localStorage.setItem('word', evt.target.value)
		}
	}

	async function handleSearch(evt) {
		evt.preventDefault()
		if (word === '' && pathname === "/movies" && localStorage.getItem('word')) {
			setWord(localStorage.getItem('word'))
		}
		props.handleSearch(word, isSearchShort)
	}

	React.useEffect(() => {
		setIsSearchShort(pathname==="/saved-movies" ? true : localStorage.getItem('short') === null ? true : JSON.parse(localStorage.getItem('short')))
		setWord(pathname==="/saved-movies" ? false : localStorage.getItem('word') === null ? false : localStorage.getItem('word'))
	}, [pathname])

	return (
		<div className="search">
			<form className="search__form">
				<div className="search__input-area">
					<img src={search} className="search__input-icon" alt="иконка поиска" />
					<input className="search__input" required placeholder="Фильм" value={word === false ? '' : word} onChange={handleChangeWord} />
					<button type="submit" className="search__input-button" onClick={handleSearch}>Найти</button>
				</div>
				<FilterCheckbox getAttribute={getAttribute}/>
			</form>
		</div>
	)
}

export default SearchForm;