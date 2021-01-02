import { h } from 'preact';
import {useCallback, useState} from "preact/hooks";
import dayjs from "dayjs";
import TaskTotalTime from "./TaskTotalTime";
import TimeLog from "../models/TimeLog";
import Task from "../models/Task";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import LogRow from "./LogRow";


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
                    <Button size={"sm"} type="button" onclick={() => updateTask(task, new Task({...task, expanded: !task.expanded}))}>{task.expanded ? '-' : '+'}</Button>
                </td>
                <td style={{fontWeight: isPlaying ? 'bold': 'normal'}}>
                    {task.name}
                </td>
                <td style={{fontWeight: isPlaying ? 'bold': 'normal'}}><TaskTotalTime task={task} key={JSON.stringify(task)}/></td>
                <td>
                    <Form action="" onsubmit={(e) => togglePlayPause(e) } inline={true}>
                        <Form.Group>
                            <Form.Control
                                placeholder={isPlaying ? "Réellement fait" : "Prévue"}
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
                            if (newName !== null && newName != task.name) {
                                updateTask(task, {...task, name: newName});
                            }
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
                    <tr>
                        <td colspan="5">
                            <Table>

                                {task.timeLog.map(log => (
                                    <LogRow log={log} updateLog={updateLog} removeLog={removeLog}/>
                                ))}
                            </Table>
                        </td>
                    </tr>
                </>
            )}
        </>
    );
}

export default TaskRow;
