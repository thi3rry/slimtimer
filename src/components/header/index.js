import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';
import Clock from "../Clock";

const Header = () => (
	<header class={style.header}>
		<h1>Slim Timer</h1>
		<Clock class={"hidden md:flex"} />
		<Clock class={"hidden sm:flex md:hidden"} format="DD/MM/YYYY HH:mm:ss" />
		<nav>
			<Link activeClassName={style.active} href="/">Tasks</Link>
		</nav>
	</header>
);

export default Header;
