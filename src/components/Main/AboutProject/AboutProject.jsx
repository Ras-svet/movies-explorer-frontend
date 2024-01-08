import "./AboutProject.css"

function AboutProject() {
	return (
	<div className="project">
		<div className="project__container">
			<h2 className="project__title">О проекте</h2>
			<div className="project__info">
				<h3 className="project__info-title">Дипломный проект включал 5 этапов</h3>
				<p className="project__info-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
				<h3 className="project__info-title">На выполнение диплома ушло 5 недель</h3>
				<p className="project__info-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
			</div>
			<div className="project__parts">
				<p className="project__part project__part-green">1 неделя</p>
				<p className="project__part">4 недели</p>
				<p className="project__part-text">Backend</p>
				<p className="project__part-text">Frontend</p>
			</div>
		</div>
	</div>
	)
}

export default AboutProject;