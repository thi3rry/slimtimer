import {useCallback, useState} from "preact/hooks";
import dayjs from "dayjs";
import TaskTotalTime from "./TaskTotalTime";
import TimeLog from "../models/TimeLog";
import Task from "../models/Task";

const TaskRow = ({task, removeTask, updateTask, moveTaskUp, moveTaskDown}) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [description, setDescription] = useState('');
    const [expanded, setExpanded] = useState(true);


    setIsPlaying(task?.getLastLog?.()?.type === TimeLog.TYPE_START);
    if (isPlaying) {
        setDescription(task.getLastLog().description);
    }
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

    const updateLogDate = useCallback((log, date = null, time = null) => {
        let updatedDate = date;
        let updatedTime = time;
        if (time === null) {
            updatedTime = log.date.format('HH:mm:ss');
        }
        if (date === null) {
            updatedDate = log.date.format('YYYY-MM-DD');
        }
        console.log('updateLogDate', updatedDate, updatedTime);
        updateLog(log, {...log, date: dayjs(`${updatedDate} ${updatedTime}`)});
    });

    return (
        <>
            <tr class={isPlaying ? 'in-progress' : ''}>
                <td>
                    <button type="button" onclick={() => setExpanded(!expanded)}>{expanded ? '-' : '+'}</button>
                </td>
                <td style={{fontWeight: isPlaying ? 'bold': 'normal'}}>
                    {task.name}
                </td>
                <td><TaskTotalTime task={task}/></td>
                <td>
                    <form action="" onsubmit={(e) => togglePlayPause(e) }>
                        <input type="text" value={description} oninput={(e) => setDescription(e.target.value)}/>
                        <button type="submit" >
                            {!isPlaying && (<span>Play</span>)}
                            {isPlaying && (<span>Pause</span>)}

                        </button>
                    </form>
                </td>

                <td>
                    <button type="button" onclick={() => moveTaskUp(task)}>^</button>
                    <button type="button" onclick={() => moveTaskDown(task)}>v</button>
                    <button type="button" onclick={() => {
                        const newName = prompt('Change name', task.name);
                        updateTask(task, {...task, name: newName});
                    }}>Edit</button>
                    <button type="button" onclick={() => removeTask(task)}>X</button>
                </td>
            </tr>
            {expanded && (
                <>
                    <tr>
                        <td colspan="5">
                            créée le {task.createdAt.format('ddd D/MMM/YYYY à HH[h]mm')}
                        </td>
                    </tr>
                    {task.timeLog.map(log => (
                        <tr>
                            <td colspan="1"></td>
                            <td><input type="date" value={log.date.format('YYYY-MM-DD')} onInput={(e) => {
                                updateLogDate(log, e.target.value);
                            }}/></td>
                            <td><input type="time" value={log.date.format('HH:mm')} onInput={(e) => {
                                updateLogDate(log, null, `${e.target.value}:00`);

                            }}/></td>
                            <td style={{color: log.type === TimeLog.TYPE_START ? 'green' : 'black'}}>{log.type}</td>
                            <td><blockquote>{log.description}</blockquote></td>
                            <td>
                                <button type="button" onclick={() => {
                                    const updatedTask = {...task};
                                    const updatedLog = {...log};
                                    log.description = prompt('Description ?', updatedLog.description);
                                    log.type = prompt('Type ?', updatedLog.type);
                                    log.date = dayjs(prompt('Date ?', updatedLog.date));
                                    updateLog(log, log);
                                }}>Edit</button>
                                <button type="button" onclick={() => {
                                    const updatedTask = new Task(task);
                                    task.timeLog.splice(task.timeLog.indexOf(log), 1)
                                    updateTask(task, task);
                                }}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </>
            )}
        </>
    );
}

export default TaskRow;
