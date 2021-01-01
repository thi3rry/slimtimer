import { h } from 'preact';
import dayjs from "dayjs";
import {useEffect, useState} from "preact/hooks";
import {Component} from "preact";
import TimeLog from "../models/TimeLog";
import Task from "../models/Task";

export default class TaskTotalTime extends Component {
    timer = undefined;

    constructor() {
        super();
        this.state = {
            lastLog: undefined,
            totalTime: 0
        }
    }

    componentWillMount() {
        this.setState({
            ...this.state,
            lastLog: this.props.task.getLastLog(),
        });
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            let newState = {
                ...this.state,
                lastLog: this.props.task.getLastLog?.(),
                totalTime: this.props.task.computeTime?.()
            };
            this.setState(newState);
        }, 400);
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const nextTask = new Task(nextProps.task);
        return nextTask.getLastLog().type === TimeLog.TYPE_START
            || nextTask.getLastLog().type !== nextState.lastLog.type
            || (
                nextTask.timeLog?.length !== this.props.task?.timeLog?.length
                && nextTask.getLastLog().type === TimeLog.TYPE_PAUSE
            )
        ;
    }

    render({task}, state, context) {
        const days = dayjs.duration(state.totalTime).days();
        const hours = dayjs.duration(state.totalTime).hours();
        const minutes = dayjs.duration(state.totalTime).minutes();
        const seconds = dayjs.duration(state.totalTime).seconds();
        return (
            <>
                {days ? `${days}j` : ''}
                {hours ? ` ${hours}h` : ''}
                {minutes ? ` ${minutes}min` : ''}
                {days < 1 && seconds ? ` ${seconds}s` : ''}
            </>
        );
    }
}
