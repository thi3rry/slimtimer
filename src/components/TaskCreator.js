import {Component, h} from 'preact';
import Task from "../models/Task";

export default class TaskCreator extends Component {
    onSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        const newTask = new Task({
            name: e.target.taskName.value,
            position: -100
        });
        this.props.onSubmit(newTask);
        e.target.taskName.value = '';
    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <label htmlFor="taskName">Nom de la tâche</label>
                <input
                    id="taskName"
                    name="taskName"
                    type="text"
                />
                <button type="submit">Ajouter une tâche</button>
            </form>
        )
    }
}
