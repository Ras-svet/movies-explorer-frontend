import React from "react"
import "./FilterCheckbox.css"
import { useLocation } from "react-router-dom"

function FilterCheckbox(props) {
	const {pathname} = useLocation()
	const [isSearchShort, setIsSearchShort] = React.useState(pathname==="/saved-movies" ? true : JSON.parse(localStorage.getItem('short')) === null ? true : JSON.parse(localStorage.getItem('short')))

	React.useEffect(() => {
		if (pathname === "/movies") {
			setIsSearchShort(JSON.parse(localStorage.getItem('short')) === null || undefined ? true : JSON.parse(localStorage.getItem('short')))
		} else if (pathname === "/saved-movies") {
			setIsSearchShort(true)
		}
	}, [pathname])

	function handleSearchShort(evt) {
		setIsSearchShort(evt.target.checked)
		if (pathname === "/movies") {
			localStorage.setItem('short', evt.target.checked)
		}
		props.getAttribute(evt.target.checked)
	}

	return (
		<div className="search__filter">
			<label className="search__button">
				<input type="checkbox" className="search__checkbox" checked={isSearchShort} onChange={handleSearchShort} />
				<span className="search__status" />
			</label>
			<p className="search__text">Короткометражки</p>
		</div>
	)
}

export default FilterCheckbox;