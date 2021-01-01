import { h } from 'preact';
import TaskRow from "./TaskRow";

const TasksList = ({tasks, removeTask, updateTask, moveTaskDown, moveTaskUp}) => {
    return (
        <table class="task-list">
            {tasks.map(task => (
                <TaskRow {...{task, removeTask, updateTask, moveTaskDown, moveTaskUp}}/>
            ))}
        </table>
    );
}

export default TasksList;
