import React from "react";
import "./Movies.css"
import { useLocation } from "react-router";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { DESCTOP_COUNT, DESCTOP_PLUS, SMALL_DESCTOP_COUNT, SMALL_DESCTOP_PLUS, TABLET_COUNT, TABLET_PLUS, MOBILE_COUNT, MOBILE_PLUS, SMALL_DESCTOP_SIZE, TABLET_SIZE, MOBILE_SIZE, SHORT_FILM } from "../../utils/constants";

function Movies(props) {
	const [cardsCount, setCardsCount] = React.useState()
	const [isPreloading, setIsPreloading] = React.useState(false)
	const [isSearching, setIsSearching] = React.useState(false)
	const [filteredCards, setFilteredCards] = React.useState(props.cards)
	const {pathname} = useLocation()

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
		setIsPreloading(true)
		let cardsToFilter = filteredCards
		if (filteredCards.length <= 0) {
			cardsToFilter = props.cards
		}
		if (word) {
			const filteredByWord = handleSearchByWord(cardsToFilter, word)
			if (!isSearchShort && isSearchShort !== undefined) {
					handleSearchByShort(filteredByWord, !isSearchShort)
			} else {
				handleSearchByWord(props.cards, word)
			}
		} else if (!isSearchShort && isSearchShort!== undefined) {
			handleSearchByShort(props.cards, !isSearchShort)
		}
		else {
			setFilteredCards([])
			if (pathname === '/saved-movies') {
				localStorage.setItem('savedCards', JSON.stringify(props.cards))
			} else {
				localStorage.setItem('cards', JSON.stringify(props.cards))
			}
		}
		setIsSearching(true)
		setIsPreloading(false)
		handleResize()
	}

	function handleSearchByWord(movies, word) {
		let newFilteredCards = []
		if (word) {
			newFilteredCards = movies.filter((element) => {
				return element.nameRU.toLowerCase().startsWith(word.toLowerCase())
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

	const savedCards = isSearching
	? JSON.parse(localStorage.getItem('savedCards'))?.slice(0, cardsCount)
	: props.cards.slice(0, cardsCount)

	React.useEffect(() => {
		handleResize()
		addMore()
	}, [window.innerWidth])

	React.useEffect(() => {
		window.addEventListener('resize', handleResize);
	}, [])

	React.useEffect(() => {
		if (pathname === '/saved-movies') {
			setIsSearching(false)
		} else if (pathname === '/movies' && localStorage.getItem('cards') === null) {
			setIsSearching(false)
		} else if (pathname === '/movies' && localStorage.getItem('cards') !== null) {
			setIsSearching(true)
		}
		setFilteredCards(props.cards)
	}, [pathname])

	return (
		<div className="movies">
			<div className="movies__container">
			<SearchForm handleSearch={handleSearch} />
			<MoviesCardList cards={pathname === '/saved-movies' ? savedCards : cards} isSearching={isSearching} isPreloading={isPreloading} allCards={pathname === "/saved-cards" ? JSON.parse(localStorage.getItem('savedCards'))?.length : JSON.parse(localStorage.getItem('cards'))?.length} add={props.add} delete={props.delete} savedFilms={props.savedFilms} addMore={addMore} />
			</div>
		</div>
	)
}

export default Movies;