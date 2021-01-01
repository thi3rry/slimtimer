import { h } from 'preact';
import {useCallback, useEffect, useState} from "preact/hooks";
import style from './style.css';
import TaskCreator from '../../components/TaskCreator';
import * as dayjs from "dayjs";
import Clock from "../../components/Clock";
import TasksList from "../../components/TasksList";
import Task from "../../models/Task";


const loadStateFromStorage = () => {
	const tasks = JSON.parse(window.localStorage.getItem('tasks')) || [];

	return {
		tasks: tasks.map(task => new Task(task)).sort((ta, tb) => ta?.position - tb?.position)
	}

}

// Note: `user` comes from the URL, courtesy of our router
const Tasks = () => {
	const [tasks, updateTasks] = useState(loadStateFromStorage().tasks);
	const setTasks = (_tasks) => {
		const tasksUpdated = [..._tasks].map(task => new Task(task));
		updateTasks(tasksUpdated);
		window.localStorage.setItem('tasks', JSON.stringify(tasksUpdated));
	}
	const addTask = (_task) => {
		setTasks([...tasks, _task]);
	}
	const removeTask = useCallback((task) =>{
		tasks.splice(tasks.indexOf(task), 1)
		setTasks(tasks);
	}, [tasks]);
	const updateTask = useCallback((old, updatedTask) => {
		console.log('updateTask', old, updatedTask);
		tasks.splice(tasks.indexOf(old), 1, updatedTask)
		setTasks(tasks);
	}, [tasks]);

	const moveTaskUp = useCallback((task) => {
		const currentPosition = tasks.indexOf(task);
		if (currentPosition > 0) {

			const elemToMove = tasks.splice(currentPosition, 1)[0];
			tasks.splice(currentPosition-1, 0, elemToMove);
			setTasks(tasks);
		}
	});

	const moveTaskDown = useCallback((task) => {
		const currentPosition = tasks.indexOf(task);
		if (currentPosition <= tasks.length) {

			const elemToMove = tasks.splice(currentPosition, 1)[0];
			tasks.splice(currentPosition+1, 0, elemToMove);
			setTasks(tasks);
		}
	});

	const [count, setCount] = useState(1);

	return (
		<div class={style.profile}>
			<Clock style={{color: "green"}}/>

			<p>
				<button onClick={() => setCount((count) => count + 1)}>Click Me</button>
				{' '}
				Clicked {count} times.
			</p>

			<div>
				<TaskCreator onCreateTask={(newTask) => addTask(newTask)}/>
				<TasksList tasks={tasks} removeTask={removeTask} updateTask={updateTask} moveTaskUp={moveTaskUp} moveTaskDown={moveTaskDown} />
			</div>
		</div>
	);
}

export default Tasks;
