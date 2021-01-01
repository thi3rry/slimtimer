import {Component, h} from 'preact';
import {useEffect, useState} from "preact/hooks";
import * as dayjs from "dayjs";
import Task from "../models/Task";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

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
            <Form onsubmit={this.onSubmit.bind(this)} inline>
                <Form.Label htmlFor="taskName">Nom de la tâche</Form.Label>
                <Form.Control
                    id="taskName"
                    name="taskName"
                    type="text"
                />
                <Button type="submit">Ajouter une tâche</Button>
            </Form>
        )
    }
}
