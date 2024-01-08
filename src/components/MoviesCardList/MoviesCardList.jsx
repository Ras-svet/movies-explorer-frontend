import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import "./MoviesCardList.css";
import React from "react";

function MoviesCardList(props) {
	const [isPreloading, setIsPreloading] = React.useState(false)
	
	return (
		<div className="cards__container">
			<ul className="cards">
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
			{props.cards?.length > 3 ? <button className="cards__more">Ещё</button> : ''}
		</div>
	)
}

export default MoviesCardList;