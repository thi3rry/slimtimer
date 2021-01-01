import { h } from 'preact';
import {useEffect, useState} from "preact/hooks";
import * as dayjs from "dayjs";
import Task from "../models/Task";

const TaskCreator = ({ onCreateTask }) => {
    return (
        <form onsubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const newTask = new Task({
                name: e.target.taskName.value
            });
            console.log('onsubmit', newTask);
            onCreateTask(newTask);
            e.target.taskName.value = '';
        }}>

            <input
                id="taskName"
                name="taskName"
                type="text"
            />
            <button type="submit">Ajouter une tâche</button>
        </form>
    )
}
export default TaskCreator;
