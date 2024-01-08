import "./Footer.css"
import { Link } from "react-router-dom";

function Footer() {
	return(
		<div className="footer">
			<div className="footer__container">
				<p className="footer__phrase">Учебный проект Яндекс.Практикум х BeatFilm.</p>
				<div className="footer__info">
					<p className="footer__text footer__text-accent">© 2024</p>
					<div className="footer__dev">
						<p className="footer__text">Яндекс.Практикум</p>
						<Link to="https://github.com/Ras-svet?tab=repositories" className="footer__text">Github</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Footer;