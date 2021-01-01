import { h } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Tasks from '../routes/tasks';

const App = () => (
	<div id="app">
		<Header />
		<Router>
			<Home path="/" />
			<Tasks path="/tasks"/>
		</Router>
	</div>
)

export default App;
