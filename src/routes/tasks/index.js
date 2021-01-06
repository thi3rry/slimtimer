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
	const [tasks, setTasks] = useState(loadStateFromStorage().tasks);
	const updateTasks = (_tasks) => {
		const tasksUpdated = [..._tasks]
			.map(task => new Task(task))
			.sort((ta, tb) => ta?.position - tb?.position)
			.map((task, i) => new Task({...task, position: i})) // recompute all position
		;
		setTasks(tasksUpdated);
		window.localStorage.setItem('tasks', JSON.stringify(tasksUpdated));
	}

	const addTask = useCallback((_task) => {
		updateTasks([...tasks, _task]);
	});

	const removeTask = useCallback((task) =>{
		tasks.splice(tasks.indexOf(task), 1)
		updateTasks(tasks);
	}, [tasks]);

	const updateTask = useCallback((old, updatedTask) => {
		tasks.splice(tasks.indexOf(old), 1, updatedTask)
		updateTasks(tasks);
	}, [tasks]);

	const moveTaskUp = useCallback((task) => {
		const currentPosition = tasks.indexOf(task);
		if (currentPosition > 0) {
			const elemToMove = tasks.splice(currentPosition, 1)[0];
			tasks.splice(currentPosition-1, 0, elemToMove);
			updateTasks(tasks.map((task, i) => new Task({...task, position: i})));
		}
	});

	const moveTaskDown = useCallback((task) => {
		const currentPosition = tasks.indexOf(task);
		if (currentPosition <= tasks.length) {

			const elemToMove = tasks.splice(currentPosition, 1)[0];
			tasks.splice(currentPosition+1, 0, elemToMove);
			updateTasks(tasks.map((task, i) => new Task({...task, position: i})));
		}
	});

	return (
		<div class={style.tasks}>
			<button onClick={() => {
				const currentExportedTasks = JSON.stringify(tasks);
				const updatedTasksInput = prompt('Copy or paste all tasks', currentExportedTasks);
				if (updatedTasksInput !== null && currentExportedTasks !== updatedTasksInput) {
					updateTasks(JSON.parse(updatedTasksInput));
				}
			}}>Export / Import</button>
			<div>
				<TaskCreator onSubmit={(newTask) => addTask(newTask)}/>
				<TasksList tasks={tasks} removeTask={removeTask} updateTask={updateTask} moveTaskUp={moveTaskUp} moveTaskDown={moveTaskDown} />
			</div>
		</div>
	);
}

export default Tasks;
