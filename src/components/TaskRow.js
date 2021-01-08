import { h } from 'preact';
import {useCallback, useState} from "preact/hooks";
import dayjs from "dayjs";
import TaskTotalTime from "./TaskTotalTime";
import TimeLog from "../models/TimeLog";
import Task from "../models/Task";
import LogRow from "./LogRow";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowDown} from "@fortawesome/free-solid-svg-icons/faArrowDown";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons/faArrowUp";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons/faPencilAlt";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import TaskPlayer from "./TaskPlayer";

const TaskRow = ({task, removeTask, updateTask, moveTaskUp, moveTaskDown}) => {

    const [isPlaying, setIsPlaying] = useState(task?.getLastLog?.()?.type === TimeLog.TYPE_START);
    const updateLog = useCallback((old, updatedLog) => {
        const updatedTask = {...task};
        updatedTask.timeLog.splice(updatedTask.timeLog.indexOf(old), 1, new TimeLog(updatedLog))
        updatedTask.timeLog.sort((a, b) => b?.date - a?.date);
        updateTask(task, new Task(updatedTask))
    });

    const removeLog = useCallback((log) => {
        task.timeLog.splice(task.timeLog.indexOf(log), 1)
        updateTask(task, task);
    });

    return (
        <>
            <tr class={isPlaying ? 'in-progress' : ''}>
                <td class="">
                    <button
                        type="button"
                        onClick={() => {
                            updateTask(task, new Task({...task, expanded: !task.expanded}))
                        }}
                    >
                        <FontAwesomeIcon icon={['far', task.expanded ? 'minus-square' : 'plus-square']} />
                    </button>
                </td>
                <td>
                    <div class="flex flex-col sm:flex-row justify-between">
                        <span style={{fontWeight: isPlaying ? 'bold': 'normal'}}>{task.name}</span>
                        <span style={{fontWeight: isPlaying ? 'bold': 'normal'}}>(<TaskTotalTime task={task} key={JSON.stringify(task)} />)</span>
                        <TaskPlayer task={task} updateTask={updateTask} />

                    </div>
                </td>
                <td>
                    <div className="button-group">
                        <button type="button" onClick={() => moveTaskUp(task)}>
                            <FontAwesomeIcon icon={faArrowUp}/>
                        </button>
                        <button type="button" onClick={() => moveTaskDown(task)}>
                            <FontAwesomeIcon icon={faArrowDown}/>
                        </button>
                        <button type="button" onClick={() => {
                            const newName = prompt('Change name', task.name);
                            if (newName !== null && newName !== task.name) {
                                updateTask(task, {...task, name: newName});
                            }
                        }}>
                            <FontAwesomeIcon icon={faPencilAlt}/>
                        </button>
                        <button
                            type="button"
                            class="text-red-800 focus:ring-red-800"
                            onClick={() => removeTask(task)}
                        >
                            <FontAwesomeIcon icon={faTrash}/>
                        </button>
                    </div>
                </td>
            </tr>
            {task.expanded && (
                <>
                    <tr>
                        <td colspan="5">
                            créée le {task.createdAt.format('ddd D/MMM/YYYY à HH[h]mm')}
                        </td>
                    </tr>
                    <tr>
                        <td colspan="5">
                            <table class="table-auto">

                                {task.timeLog.map(log => (
                                    <LogRow log={log} updateLog={updateLog} removeLog={removeLog}/>
                                ))}
                            </table>
                        </td>
                    </tr>
                </>
            )}
        </>
    );
}

export default TaskRow;
