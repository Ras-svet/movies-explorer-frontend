import React from "react"
import "./FilterCheckbox.css"

function FilterCheckbox(props) {
	return (
		<div className="search__filter">
			<label className="search__button">
				<input type="checkbox" className="search__checkbox" />
				<span className="search__status" />
			</label>
			<p className="search__text">Короткометражки</p>
		</div>
	)
}

export default FilterCheckbox;