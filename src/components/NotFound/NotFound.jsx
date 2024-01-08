import './NotFound.css'
import { Link } from 'react-router-dom';

function NotFound() {
	return (
		<div className="notfound">
			<div className="notfound__container">
				<h1 className="notfound__title">404</h1>
				<p className="notfound__text">Страница не найдена</p>
			</div>
			<Link to="/" className="notfound__link">Назад</Link>
		</div>
	);
};

export default NotFound;