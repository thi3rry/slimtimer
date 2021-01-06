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
		<Router history={createHashHistory()}>
			<Home path="/" />
			<Tasks path="/tasks" />
			<Home path="/tags" />
			<Home path="/timelogs" />
		</Router>
	</div>
)

export default App;
