import React from "react"
import Enter from "../Enter";
import "../Enter.css"

function Login(props){
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [isActive, setIsActive] = React.useState(false);
	const [emailError, setEmailError] = React.useState('');
	const [passwordError, setPasswordError] = React.useState('')

	function handleSubmit(evt) {
		evt.preventDefault()
		props.onSubmit(email, password)
	}

	function handleChangeEmail(evt) {
		setEmail(evt.target.value)
		const reg = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
		if (!reg.test(evt.target.value)) {
			setEmailError("Введите корректный email формата example@domain.ru")
		}
		else {
			setEmailError('')
		}
	}

	function handleChangePassword(evt) {
		setPassword(evt.target.value)
		if (evt.target.value.length < 3 || evt.target.value.length > 32) {
			setPasswordError("Пароль должен быть больше 3 символов и меньше 32")
		}
		else {
			setPasswordError('')
		}
	}

	React.useEffect(() => {
		if (passwordError || emailError) {
			setIsActive(false)
		} else if (password === '' || email === '') {
				setIsActive(false)
			} else {
			setIsActive(true)
			}
	}, [passwordError, emailError])

	return (
		<Enter
		title="Рады видеть!"
		buttonTitle="Войти"
		textBeforeLink="Еще не зарегистрированы?"
		link="/signup"
		textLink="Регистрация"
		login={true}
		onClick={handleSubmit}
		isActive={isActive}
		>
			<label className="enter__label">
				E-mail
				<input className={`enter__input ${emailError ? 'enter__input-error' : ''}`} placeholder="Почта" name="email" type="email" required minLength="3" maxLength="32" onInput={handleChangeEmail}></input>
			</label>
			<span className="enter__error">{emailError}</span>
			<label className="enter__label">
				Пароль
				<input className={`enter__input ${passwordError !== '' ? 'enter__input-error' : ''}`} placeholder="Пароль" name="password" type="password" required minLength="3" maxLength="32" onInput={handleChangePassword}></input>
			</label>
			<span className="enter__error">{passwordError}</span>
		</Enter>
	)
}

export default Login;