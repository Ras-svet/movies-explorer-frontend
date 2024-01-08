import React from "react";
import "./MoviesCard.css"
import image from "../../images/cards/1.png"
import { useLocation } from "react-router-dom";

function MoviesCard(props) {
	const [isLiked, setIsLiked] = React.useState(false);
	const { pathname } = useLocation()

	function handleLike() {
		setIsLiked(!isLiked)
	}

	return (
		<li className="card">
			<img src={props.card.image} className="card__image" alt="обложка" />
			<div className="card__info">
				<h2 className="card__title">{props.card.title}</h2>
				{pathname === "/saved-movies"
				? <button className="card__button-close"></button>
				: <button className={`card__button ${isLiked ? 'card__button-saved' : 'card__button-save'}`} onClick={handleLike}></button>}
			</div>
			<p className="card__time">{props.card.duration}</p>
		</li>
	)
}

export default MoviesCard;