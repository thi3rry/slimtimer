import { h } from 'preact';
import {useCallback, useState} from "preact/hooks";
import dayjs from "dayjs";
import TaskTotalTime from "./TaskTotalTime";
import TimeLog from "../models/TimeLog";
import Task from "../models/Task";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {Form} from "react-bootstrap";


const TaskRow = ({task, removeTask, updateTask, moveTaskUp, moveTaskDown}) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [description, setDescription] = useState('');


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
                    <Button size={"sm"} type="button" onclick={() => updateTask(task, new Task({...task, expanded: !task.expanded}))}>{task.expanded ? '-' : '+'}</Button>
                </td>
                <td style={{fontWeight: isPlaying ? 'bold': 'normal'}}>
                    {task.name}
                </td>
                <td><TaskTotalTime task={task} key={JSON.stringify(task)}/></td>
                <td>
                    <Form action="" onsubmit={(e) => togglePlayPause(e) } inline={true}>
                        <Form.Group>
                            <Form.Control
                                placeholder="Description"
                                type="text"
                                value={description}
                                oninput={(e) => setDescription(e.target.value)}
                            />
                            <Button type="submit" variant="outline-dark" >
                                {!isPlaying && (<i className="ri-play-line"></i>)}
                                {isPlaying && (<i className="ri-pause-line"></i>)}

                            </Button>
                        </Form.Group>
                    </Form>
                </td>

                <td>
                    <ButtonGroup size={"sm"}>

                        <Button variant="outline-primary" type="button" onclick={() => moveTaskUp(task)}>^</Button>
                        <Button variant="outline-primary" type="button" onclick={() => moveTaskDown(task)}>v</Button>
                        <Button variant="outline-primary" type="button" onclick={() => {
                            const newName = prompt('Change name', task.name);
                            updateTask(task, {...task, name: newName});
                        }}>Edit</Button>
                        <Button variant="outline-primary" type="button" onclick={() => removeTask(task)}>X</Button>
                    </ButtonGroup>
                </td>
            </tr>
            {task.expanded && (
                <>
                    <tr>
                        <td colspan="5">
                            créée le {task.createdAt.format('ddd D/MMM/YYYY à HH[h]mm')}
                        </td>
                    </tr>
                    {task.timeLog.map(log => (
                        <tr>
                            <td colspan="1"></td>
                            <td><input type="date" onkeydown={() => false} value={log.date.format('YYYY-MM-DD')} onChange={(e) => {
                                updateLogDate(log, e.target.value);
                            }}/></td>
                            <td><input type="time" onkeydown={() => false} value={log.date.format('HH:mm')} onChange={(e) => {
                                updateLogDate(log, null, `${e.target.value}:00`);

                            }}/></td>
                            <td style={{color: log.type === TimeLog.TYPE_START ? 'green' : 'black'}}>{log.type}</td>
                            <td><blockquote>{log.description}</blockquote></td>
                            <td>
                                <ButtonGroup>
                                    <Button variant="outline-primary" type="button" onclick={() => {
                                        const updatedTask = {...task};
                                        const updatedLog = {...log};
                                        log.description = prompt('Description ?', updatedLog.description);
                                        log.type = prompt('Type ?', updatedLog.type);
                                        log.date = dayjs(prompt('Date ?', updatedLog.date));
                                        updateLog(log, log);
                                    }}>Edit</Button>
                                    <Button variant="outline-danger" type="button" onclick={() => {
                                        const updatedTask = new Task(task);
                                        task.timeLog.splice(task.timeLog.indexOf(log), 1)
                                        updateTask(task, task);
                                    }}>Remove</Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))}
                </>
            )}
        </>
    );
}

export default TaskRow;
