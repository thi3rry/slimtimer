import { h } from 'preact';
import {useCallback, useState} from "preact/hooks";
import dayjs from "dayjs";
import TaskTotalTime from "./TaskTotalTime";
import TimeLog from "../models/TimeLog";
import Task from "../models/Task";
import LogRow from "./LogRow";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowDown, faArrowUp, faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons";

const TaskRow = ({task, removeTask, updateTask, moveTaskUp, moveTaskDown}) => {

    const [isPlaying, setIsPlaying] = useState(task?.getLastLog?.()?.type === TimeLog.TYPE_START);
    const [description, setDescription] = useState(isPlaying ? task.getLastLog().description : '');


    const togglePlayPause = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        const newTimeLog = new TimeLog({
            description
        });
        if (isPlaying) {
            newTimeLog.type = TimeLog.TYPE_PAUSE;
        }
        else {
            newTimeLog.type = TimeLog.TYPE_START;
        }
        updateTask(task, new Task({
            ...task,
            timeLog: [...task.timeLog, newTimeLog]
        }));
        setIsPlaying(!isPlaying);
        setDescription('');
    });


    const updateLog = useCallback((old, updatedLog) => {
        const updatedTask = {...task};
        updatedTask.timeLog.splice(updatedTask.timeLog.indexOf(old), 1, new TimeLog(updatedLog))
        updatedTask.timeLog.sort((a, b) => b?.date - a?.date);
        updateTask(task, new Task(updatedTask))
    });

    const removeLog = useCallback((log) => {
        const updatedTask = new Task(task);
        task.timeLog.splice(task.timeLog.indexOf(log), 1)
        updateTask(task, task);
    });

    return (
        <>
            <tr class={isPlaying ? 'in-progress' : ''}>
                <td>
                    <button
                        type="button"
                        onClick={() => {
                            updateTask(task, new Task({...task, expanded: !task.expanded}))
                        }}
                    >
                        <FontAwesomeIcon icon={['far', task.expanded ? 'minus-square' : 'plus-square']} />
                    </button>
                </td>
                <td style={{fontWeight: isPlaying ? 'bold': 'normal'}}>
                    {task.name}
                </td>
                <td style={{fontWeight: isPlaying ? 'bold': 'normal'}}>
                    <TaskTotalTime task={task} key={JSON.stringify(task)}/>
                </td>
                <td>
                    <form action="" onSubmit={(e) => togglePlayPause(e) }>
                            <input
                                placeholder={isPlaying ? "Réellement fait" : "Prévue"}
                                type="text"
                                value={description}
                                onInput={(e) => setDescription(e.target.value)}
                            />
                            <button type="submit" >
                                <FontAwesomeIcon icon={isPlaying ? 'pause' : 'play'}/>
                            </button>
                    </form>
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
