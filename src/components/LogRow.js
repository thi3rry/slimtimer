import { h } from 'preact';
import dayjs from "dayjs";
import {Component} from "preact";
import TimeLog from "../models/TimeLog";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

export default class LogRow extends Component {
    state = {
        ...(new TimeLog())
    };

    static getDerivedStateFromProps({log, updateLog, removeLog}, state) {
        const updatedState = {...state};

        if (log.date !== state.date) {
            updatedState.date = log.date;
        }
        if (log.type !== state.type) {
            updatedState.type = log.type;
        }
        if (log.description !== state.description) {
            updatedState.description = log.description;
        }
        return updatedState;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const propLog = { ...nextProps.log };
        const stateLog = {...nextState}
        return JSON.stringify(propLog) !== JSON.stringify(stateLog);
    }

    updateLog(newLog) {
        this.setState({
            ...this.state,
            ...newLog
        });
        if (this.props.updateLog) {
            this.props.updateLog(this.props.log, newLog);
        }
        else {
            throw new Error('`updateLog` prop was lost or not passed to LogRow component.');
        }
    }

    updateLogDate(date = null, time = null) {
        let updatedDate = date;
        let updatedTime = time;
        console.log('updateLogDate', this.state);
        if (time === null) {
            updatedTime = this.state.date.format('HH:mm:ss');
        }
        if (date === null) {
            updatedDate = this.state.date.format('YYYY-MM-DD');
        }
        this.updateLog({...this.state, date: dayjs(`${updatedDate} ${updatedTime}`)});
    }

    promptEditLog() {
        const updatedLog = new TimeLog({...this.state});
        const description = prompt('Description ?', updatedLog.description)
        const type = prompt('Type ?', updatedLog.type);
        const date = dayjs(prompt('Date ?', updatedLog.date));
        if (description !== null && description !== updatedLog.description) {
            updatedLog.description = description;
        }
        if (type !== null && type !== updatedLog.type) {
            updatedLog.type = type;
        }
        if (date !== null && date !== updatedLog.date) {
            updatedLog.date = date;
        }
        this.updateLog(updatedLog);
    }

    removeLog() {
        if (this.props.removeLog) {
            this.props.removeLog(this.props.log);
        }
        else {
            throw new Error('`removeLog` prop was lost or not passed to LogRow component.');
        }
    }

    render() {
        console.log('render log', this.state);
        return (
            <tr>
                <td colSpan="1"></td>
                <td>
                    <input
                        type="date"
                        onKeyDown={() => false}
                        value={this.state.date.format('YYYY-MM-DD')}
                        onChange={(e) => {
                            this.updateLogDate(e.target.value);
                        }}
                    />
                </td>
                <td>
                    <input
                        type="time"
                        onKeyDown={() => false}
                        value={this.state.date.format('HH:mm')}
                        onChange={(e) => {
                            this.updateLogDate(null, `${e.target.value}:00`);
                        }}
                    />
                </td>
                <td style={{color: this.state.type === TimeLog.TYPE_START ? 'green' : 'black'}}>
                    {this.state.type}
                </td>
                <td>
                    <blockquote>{this.state.description}</blockquote>
                </td>
                <td>
                    <ButtonGroup>
                        <Button variant="outline-primary" type="button" onclick={() => this.promptEditLog()}>Edit</Button>
                        <Button variant="outline-danger" type="button" onclick={() => this.removeLog()}>Remove</Button>
                    </ButtonGroup>
                </td>
            </tr>
        );
    }
}