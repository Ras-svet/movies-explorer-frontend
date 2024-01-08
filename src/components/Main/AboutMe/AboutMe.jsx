import "./AboutMe.css"
import me from "../../../images/photo_5228731914326757795_y.jpg"
import { Link } from "react-router-dom";

function AboutMe() {
	return (
		<div className="me">
			<h2 className="me__title">Студент</h2>
			<div className="me__info">
				<div className="me__description">
					<h3 className="me__name">Светлана</h3>
					<p className="me__job">Фронтенд-разработчик, 21 год</p>
					<p className="me__resume">Я родилась в городе Тольятти, но живу и учусь в Санкт-Петербурге, закончиваю направление прикладной информатики ИТМ. Успела поработать стажером в государственной IT компании, но поняла, что готова для большего</p>
					<Link to="https://github.com/Ras-svet?tab=repositories" className="me__github">Github</Link>
				</div>
				<img className="me__photo" src={me} alt="аватар" />
			</div>
			<h3 className="me__subtitle">Портфолио</h3>
			<nav>
				<ul className="me__links">
					<li>
						<Link to="https://ras-svet.github.io/how-to-learn/" className="me__link">Статичный сайт<span className="me__link-arrow">↗</span></Link>
					</li>
					<li>
						<Link to="https://ras-svet.github.io/russian-travel/" className="me__link">Адаптивный сайт<span className="me__link-arrow">↗</span></Link>
					</li>
					<li>
						<Link to="https://ras-svet.github.io/mesto/" className="me__link">Одностраничное приложение<span className="me__link-arrow">↗</span></Link>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default AboutMe;