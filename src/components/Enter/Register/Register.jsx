import React from "react"
import Enter from "../Enter";
import "../Enter.css"

function Register(props){
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [name, setName] = React.useState('');
	const [isActive, setIsActive] = React.useState(false);
	const [emailError, setEmailError] = React.useState('');
	const [passwordError, setPasswordError] = React.useState('');
	const [nameError, setNameError] = React.useState('')

	function handleSubmit(evt) {
		evt.preventDefault()
		props.onSubmit(name, email, password)
	}

	function handleChangeName(evt) {
		setName(evt.target.value)
		if (evt.target.value.length < 3 || evt.target.value.length > 32) {
			setNameError("Имя должно быть больше 3 символов и меньше 32")
		}
		else {
			setNameError('')
		}
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
		} else if (name === '' || password === '' || email === '') {
				setIsActive(false)
			} else {
			setIsActive(true)
			}
	}, [passwordError, emailError])

	return (
		<Enter
		title="Добро пожаловать!"
		buttonTitle="Зарегистрироваться"
		textBeforeLink="Уже зарегистрированы?"
		link="/signin"
		textLink="Войти"
		login={false}
		onClick={handleSubmit}
		isActive={isActive}
		>
			<label className="enter__label">
				Имя
				<input className={`enter__input ${nameError !== '' ? 'enter__input-error' : ''}`} required name="name" placeholder="Имя" type="text" minLength="3" maxLength="32" onChange={handleChangeName}></input>
			</label>
			<span className="enter__error">{nameError}</span>
			<label className="enter__label">
				E-mail
				<input className={`enter__input ${emailError !== '' ? 'enter__input-error' : ''}`} required name="email" placeholder="Почта" type="email" minLength="3" maxLength="32" onChange={handleChangeEmail}></input>
			</label>
			<span className="enter__error">{emailError}</span>
			<label className="enter__label">
				Пароль
				<input className={`enter__input ${passwordError !== '' ? 'enter__input-error' : ''}`} required name="password" placeholder="Пароль" type="password" minLength="3" maxLength="32" onChange={handleChangePassword}></input>
			</label>
			<span className="enter__error">{passwordError}</span>
		</Enter>
	)
	
}

export default Register;