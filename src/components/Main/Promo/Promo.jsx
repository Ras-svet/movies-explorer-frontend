import React from "react"
import lines from "../../../images/lines.svg"
import "./Promo.css"

function Promo() {
	return (
		<div className="promo">
			<h1 className="promo__title">Учебный проект студента факультета Веб-разработки</h1>
			<img className="promo__img" src={lines} alt="картинка для фона" />
		</div>
	)
}

export default Promo;