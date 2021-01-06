import { h } from 'preact';
import { Router } from 'preact-router';
import { createHashHistory } from 'history';


import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Tasks from '../routes/tasks';

const App = () => (
	<div id="app" class="font-mono">
		<Header />
		<Router>
			<Home path="/" />
			<Tasks path="/tasks" />
		</Router>
	</div>
)

export default App;
