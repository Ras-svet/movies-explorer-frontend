import React from "react";
import "./MoviesCard.css"
import { useLocation } from "react-router-dom";

function MoviesCard(props) {
	const [isLiked, setIsLiked] = React.useState(props.savedFilms ? props.savedFilms.some(savedFilm => savedFilm.movieId === props.card.id) : true);
	const { pathname } = useLocation()
	const hours = Math.floor(props.card.duration / 60);
	const minutes = Math.floor(props.card.duration % 60);

	function handleLike() {
		if (isLiked) {
			const id = props.savedFilms
			.filter((savedfilm) => savedfilm.movieId === props.card.id);
			handleDelete(id[0]._id)
			setIsLiked(false)
		} else {
			props.add(props.card)
			setIsLiked(true)
		}
	}

	function handleDelete(id) {
		props.delete(id)
	}

	return (
		<li className="card">
			<a href={props.card.trailerLink}><img src={props.card.image.url ? `https://api.nomoreparties.co/${props.card.image.url}` : `${props.card.image}`} className="card__image" alt="обложка" /></a>
			<div className="card__info">
				<h2 className="card__title">{props.card.nameRU}</h2>
				{pathname === "/saved-movies"
				? <button type="button" className="card__button-close" onClick={(() => handleDelete(props.card._id))}></button>
				: <button type="button" className={`card__button ${isLiked ? 'card__button-saved' : 'card__button-save'}`} onClick={handleLike}></button>}
			</div>
			<p className="card__time">{hours > 0 ? `${hours} ч` : ''} {minutes + ''} м</p>
		</li>
	)
}

export default MoviesCard;