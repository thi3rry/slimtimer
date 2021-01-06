import { h } from 'preact';
import style from './style.css';
import Counter from "../../components/Counter";

const Home = () => (
	<div class={style.home}>
		<h1>Home</h1>
		<p>This is the Home component.</p>
		<Counter />
	</div>
);

export default Home;
