import React from "react";
import { Link } from "react-router-dom";
import "./Enter.css"
import logo from "../../images/logo.svg"

function Enter (props) {
	return (
		<div className="enter">
			<Link to="/" className="enter__logo"><img src={logo} alt="логотип" /></Link>
			<h1 className="enter__title">{props.title}</h1>
			<form className="enter__form" onSubmit={props.onClick} autoComplete="off">
				{props.children}
				<button disabled={!props.isActive} className={`enter__button ${props.login ? 'enter__button-login' : ''} ${props.isActive ? '' : 'enter__button_disable'}`} type="submit">{props.buttonTitle}</button>
			</form>
			<p className="enter__link-text">{props.textBeforeLink}<Link to={props.link} className="enter__link"> {props.textLink}</Link></p>
		</div>
	)
}

export default Enter;