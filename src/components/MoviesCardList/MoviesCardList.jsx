import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import "./MoviesCardList.css";
import React from "react";
import { useLocation } from "react-router-dom";

function MoviesCardList(props) {
	const [isPreloading, setIsPreloading] = React.useState(false)
	const { pathname } = useLocation()
	
	return (
		<div className="cards">
			<ul className={`cards__container ${pathname === "/saved-movies" ? 'cards__container-saved' : ''}`}>
				{props.cards?.map((card) => (
					<MoviesCard
						key={card.id}
						card={card}
					/>
				))}
			</ul>
			{isPreloading
			? <Preloader />
			: ''}
			{props.cards?.length > 3 ? <button type="button" className="cards__more">Ещё</button> : ''}
		</div>
	)
}

export default MoviesCardList;