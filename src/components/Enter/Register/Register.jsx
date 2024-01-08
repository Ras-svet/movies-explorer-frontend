import React from "react"
import Enter from "../Enter";
import "../Enter.css"

function Register(){
	return (
		<Enter 
		title="Добро пожаловать!"
		buttonTitle="Зарегистрироваться"
		textBeforeLink="Уже зарегистрированы?"
		link="/signin"
		textLink="Войти"
		login={false}
		>
			<label className="enter__label">
				Имя
				<input className="enter__input" required name="name" type="text" minLength="3" maxLength="32"></input>
			</label>
			<label className="enter__label">
				E-mail
				<input className="enter__input" required name="email" type="email" minLength="3" maxLength="32"></input>
			</label>
			<label className="enter__label">
				Пароль
				<input className="enter__input" required name="password" type="password" minLength="3" maxLength="32"></input>
			</label>
		</Enter>
	)
	
}

export default Register;