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
            lastLogType: undefined,
            totalTime: 0
        }
    }

    componentWillMount() {
        this.setState({
            ...this.state,
            lastLogType: this.props.task.getLastLog?.()?.type,
            totalTime: this.props.task.computeTime()
        });
    }

    getDerivedStateFromProps(nextProps) {
        this.setState({
            ...this.state,
            lastLogType: nextProps.task.getLastLog?.().type,
            totalTime: this.props.task.computeTime()
        });
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            let newState = {
                ...this.state,
                lastLogType: this.props.task.getLastLog?.().type,
                totalTime: this.props.task.computeTime()
            };
            this.setState(newState);
        }, 400);
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState.lastLogType === TimeLog.TYPE_START;
    }

    render({task}, state, context) {
        const totalTime = this.props.task.computeTime?.()
        const days = dayjs.duration(totalTime).days();
        const hours = dayjs.duration(totalTime).hours();
        const minutes = dayjs.duration(totalTime).minutes();
        const seconds = dayjs.duration(totalTime).seconds();
        return (
            <>
                {days ? (<span>{`${days}j`} </span>) : ''}
                {hours ? (<span>{`${hours}h`} </span>) : ''}
                {minutes ? (<span>{`${minutes}minutes`} </span>) : ''}
                {days < 1 && seconds ? (<span> {`${seconds}s`}</span>) : ''}
            </>
        );
    }
}
