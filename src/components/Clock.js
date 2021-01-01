import {useEffect, useState} from "preact/hooks";
import * as dayjs from "dayjs";

const Clock = (props) => {
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        let timer = setInterval(() => setTime(Date.now()), 400);
        return () => clearInterval(timer);
    }, [time]);


    return (
        <span {...props}>{dayjs(time).format('dddd DD MMM YYYY HH:mm:ss')}</span>
    )
}

export default Clock;
