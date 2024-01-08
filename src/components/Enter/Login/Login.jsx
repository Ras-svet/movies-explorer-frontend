import React from "react"
import Enter from "../Enter";
import "../Enter.css"

function Login(){
	return (
		<Enter
		title="Рады видеть!"
		buttonTitle="Войти"
		textBeforeLink="Еще не зарегистрированы?"
		link="/signup"
		textLink="Регистрация"
		login={true}
		>
			<label className="enter__label">
				E-mail
				<input className="enter__input" name="email" type="email"></input>
			</label>
			<label className="enter__label">
				Пароль
				<input className="enter__input" name="password" type="password"></input>
			</label>
		</Enter>
	)
}

export default Login;