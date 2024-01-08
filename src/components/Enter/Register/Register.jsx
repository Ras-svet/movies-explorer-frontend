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
				<input className="enter__input" name="name" type="text"></input>
			</label>
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

export default Register;