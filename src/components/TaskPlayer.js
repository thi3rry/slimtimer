import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useCallback, useState} from "preact/hooks";
import TimeLog from "../models/TimeLog";
import Task from "../models/Task";

export default function TaskPlayer({task, updateTask }) {
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
        if (!isPlaying) {
            setDescription('');
        }
    });


    return (
        <form action="" onSubmit={(e) => togglePlayPause(e)}>
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
    );
}
