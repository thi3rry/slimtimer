import { h } from 'preact';
import TaskRow from "./TaskRow";
import {Table} from "react-bootstrap";

const TasksList = ({tasks, removeTask, updateTask, moveTaskDown, moveTaskUp}) => {
    return (
        <Table class="task-list">
            {tasks.map(task => (
                <TaskRow {...{task, removeTask, updateTask, moveTaskDown, moveTaskUp}} key={JSON.stringify(task)}/>
            ))}
        </Table>
    );
}

export default TasksList;
