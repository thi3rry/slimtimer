import { h } from 'preact';
import TaskRow from "./TaskRow";

const TasksList = ({tasks, removeTask, updateTask, moveTaskDown, moveTaskUp}) => {
    return (
        <table class="table-auto">
            {tasks.map(task => (
                <TaskRow {...{task, removeTask, updateTask, moveTaskDown, moveTaskUp}} key={JSON.stringify(task)}/>
            ))}
        </table>
    );
}

export default TasksList;
