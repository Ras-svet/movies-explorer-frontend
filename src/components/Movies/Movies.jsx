import React from "react";
import "./Movies.css"
import api from "../../utils/MoviesApi";
import { useLocation } from "react-router";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { DESCTOP_COUNT, DESCTOP_PLUS, SMALL_DESCTOP_COUNT, SMALL_DESCTOP_PLUS, TABLET_COUNT, TABLET_PLUS, MOBILE_COUNT, MOBILE_PLUS, SMALL_DESCTOP_SIZE, TABLET_SIZE, MOBILE_SIZE, SHORT_FILM } from "../../utils/constants";
import mainApi from "../../utils/MainApi";

function Movies(props) {
	const [cardsCount, setCardsCount] = React.useState()
	const [isPreloading, setIsPreloading] = React.useState(false)
	const [isSearching, setIsSearching] = React.useState(false)
	const [allCards, setAllCards] = React.useState([])
	const [filteredCards, setFilteredCards] = React.useState(props.cards)
	const [allSavedCards, setAllSavedCards] = React.useState(props.cards)
	const {pathname} = useLocation()

	React.useEffect(() => {
		window.addEventListener('resize', handleResize);
		handleResize()
	}, [])

	function handleResize() {
		const windowWidth = window.innerWidth;
		if (windowWidth <= MOBILE_SIZE) {
			setCardsCount(MOBILE_COUNT)
		} else if (windowWidth <= TABLET_SIZE) {
			setCardsCount(TABLET_COUNT)
		} else if (windowWidth < SMALL_DESCTOP_SIZE) {
			setCardsCount(SMALL_DESCTOP_COUNT)
		} else {
			setCardsCount(DESCTOP_COUNT)
		}
	}

	function addMore() {
		const windowWidth = window.innerWidth;
		if (windowWidth <= MOBILE_SIZE) {
			setCardsCount(prev => prev + MOBILE_PLUS)
		} else if (windowWidth <= TABLET_SIZE) {
			setCardsCount(prev => prev + TABLET_PLUS)
		} else if (windowWidth < SMALL_DESCTOP_SIZE) {
				setCardsCount(prev => prev + SMALL_DESCTOP_PLUS)
		} else {
			setCardsCount(prev => prev + DESCTOP_PLUS)
		}
	}

	function handleSearch(word, isSearchShort) {
		if (pathname === "/movies" && allCards.length === 0) {
			setIsSearching(true)
			setIsPreloading(true)
			api.getAllMovies()
			.then((movies) => {
				setAllCards(movies)
				handleSearchAll(movies, word, isSearchShort)
			})
			.catch((err) => {
				if (err.message === "Необходима авторизация") {
					props.logOut()
				}
			})
		} else if (pathname === "/movies" && allCards.length !== 0) {
			setIsSearching(true)
			handleSearchAll(allCards, word, isSearchShort)
		} else if (pathname === "/saved-movies") {
			setIsSearching(true)
			handleSearchAll(props.cards, word, isSearchShort)
		}
	}

	function handleSearchAll(movies, word, isSearchShort) {
		if (word) {
			const filteredByWord = handleSearchByWord(movies, word)
			if (!isSearchShort && isSearchShort !== undefined) {
				handleSearchByShort(filteredByWord, !isSearchShort)
			} else {
				handleSearchByWord(movies, word)
			}
		} else if (!isSearchShort && isSearchShort!== undefined) {
			handleSearchByShort(movies, !isSearchShort)
		} else {
				setFilteredCards([])
				if (pathname === '/saved-movies') {
					setIsSearching(false)
					localStorage.setItem('savedCards', JSON.stringify([]))
				} else {
					localStorage.setItem('cards', JSON.stringify(movies))
				}
			}
		setIsPreloading(false)
		handleResize()
	}

	function handleSearchByWord(movies, word) {
		let newFilteredCards = []
		if (word) {
			newFilteredCards = movies.filter((element) => {
				return element.nameRU.toLowerCase().includes(word.toLowerCase())
			})
		}
		setFilteredCards(newFilteredCards?.length > 0 ? newFilteredCards : '')
		if (pathname === '/saved-movies') {
			localStorage.setItem('savedCards', JSON.stringify(newFilteredCards))
		} else {
			localStorage.setItem('cards', JSON.stringify(newFilteredCards))
		}
		return newFilteredCards
	}

	function handleSearchByShort(movies, isSearchShort) {
		let newFilteredCards = []
		if (isSearchShort && movies?.length > 0) {
			newFilteredCards = movies
			.filter((element) => {
				return element.duration <= SHORT_FILM
			})
		}
		setFilteredCards(newFilteredCards?.length > 0 ? newFilteredCards : [])
		if (pathname === '/saved-movies') {
			localStorage.setItem('savedCards', JSON.stringify(newFilteredCards))
		} else {
			localStorage.setItem('cards', JSON.stringify(newFilteredCards))
		}
		return newFilteredCards
	}

	const cards = JSON.parse(localStorage.getItem('cards'))?.slice(0, cardsCount)

	// const savedCards = localStorage.getItem('savedCards') !== null && JSON.parse(localStorage.getItem('savedCards')).length > 0
	// ? isSearching
	// 	? JSON.parse(localStorage.getItem('savedCards'))
	// 	: props.cards
	// : props.cards

	const savedCards = isSearching
	? JSON.parse(localStorage.getItem('savedCards'))
	: props.cards

	React.useEffect(() => {
		if (pathname === '/saved-movies') {
			setIsSearching(false)
		} else if (pathname === '/movies' && localStorage.getItem('cards') === null) {
			setIsSearching(false)
		} else if (pathname === '/movies' && localStorage.getItem('cards') !== null) {
			setIsSearching(true)
		}
		setFilteredCards(props.cards)
		setAllSavedCards(props.cards)
	}, [pathname])

	// allCards={pathname === "/saved-cards" ? JSON.parse(localStorage.getItem('savedCards'))?.length : JSON.parse(localStorage.getItem('cards'))?.length}
	return (
		<div className="movies">
			<div className="movies__container">
			<SearchForm handleSearch={handleSearch} />
			<MoviesCardList cards={pathname === "/saved-movies" ? savedCards : cards} isSearching={isSearching} isPreloading={isPreloading} lengthFilteredCards={JSON.parse(localStorage.getItem('cards'))?.length} add={props.add} delete={props.delete} savedFilms={props.savedFilms} addMore={addMore} />
			</div>
		</div>
	)
}

export default Movies;