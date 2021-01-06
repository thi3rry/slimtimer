import { h } from 'preact';
import {useEffect, useState} from "preact/hooks";
import * as dayjs from "dayjs";

const Clock = (props) => {
    const [time, setTime] = useState(props.time || Date.now());

    useEffect(() => {
        let timer = setInterval(() => setTime(Date.now()), 400);
        return () => clearInterval(timer);
    }, [time]);

    const [format, setFormat] = useState(props.format || 'dddd DD MMM YYYY HH:mm:ss');

    return (
        <span {...props} class={props.class ? `clock ${props.class}` : 'clock'}>
            {dayjs(time).format(format)}
        </span>
    )
}

export default Clock;
