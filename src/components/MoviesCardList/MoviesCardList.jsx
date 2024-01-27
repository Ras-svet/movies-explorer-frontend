import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import "./MoviesCardList.css";
import React from "react";
import { useLocation } from "react-router-dom";

function MoviesCardList(props) {
	const {pathname} = useLocation()
	const [isEmpty, setIsEmpty] = React.useState(true)

	React.useEffect(() => {
		if (pathname === "/saved-movies") {
			setIsEmpty(props.cards?.length > 0 ? true : false)
		} else {
			setIsEmpty(JSON.parse(localStorage.getItem('cards'))?.length > 0 ? true : false)
		}
	}, [props.cards])

	return (
		<div className="cards">
			<ul className={`cards__container ${pathname === "/saved-movies" ? 'cards__container-saved' : ''}`}>
				{props.isSearching || pathname ==="/saved-movies"
				? props.isPreloading
					? <Preloader />
					: !isEmpty
						? <p className="cards__error">Ничего не найдено</p>
						: props.cards?.map((card) => (
						<MoviesCard
							key={card.id ? card.id : card._id}
							card={card}
							add={props.add}
							delete={props.delete}
							savedFilms={props.savedFilms}
						/>
						))
				: ''}
			</ul>
			{/* {props.isPreloading
			? <Preloader />
			: ''} */}
			{pathname !== "/saved-movies" && props.cards?.length > 0 && props.cards?.length !== props.lengthFilteredCards ? <button type="button" className="cards__more" onClick={props.addMore}>Ещё</button> : ''}
		</div>
	)
}

export default MoviesCardList;