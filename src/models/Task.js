import dayjs from "dayjs";
import TimeLog from "./TimeLog";

export default class Task {

    name = '';
    timeLog = [];
    createdAt;
    position = 0;
    expanded = false;

    constructor(attr) {
        this.createdAt = dayjs(new Date());

        if (attr?.name) {
            this.name = attr.name;
        }
        if (attr?.position) {
            this.position = attr.position;
        }
        if (attr?.expanded) {
            this.expanded = attr.expanded;
        }
        if (attr?.createdAt) {
            this.createdAt = dayjs(attr.createdAt);
        }
        if (attr?.timeLog) {
            this.timeLog = attr.timeLog.map(log => new TimeLog(log));
        }
        this.timeLog.sort((a, b) => b?.date - a?.date);
    }

    /**
     * Get the last timeLog of a task
     * @param task
     * @returns {*}
     */
    getLastLog() {
        const logs = [...this.timeLog].map(log => new TimeLog(log))
            // Remove futures logs
            .filter((log) => log.date <= dayjs())
        ;
        logs.sort((a, b) => b?.date - a?.date);
        return new TimeLog(logs.shift());
    }

    /**
     * Compute all the time of a task
     * @param task
     * @returns {int} number of second
     */
    computeTime() {
        const logs = [...this.timeLog].map(log => new TimeLog(log));
        logs.sort((a, b) => a?.date - b?.date);
        let {total: totalTime} = logs.reduce(({total, previous}, log) => {
            const computeTime = previous?.type === 'START';
            let computedTime = 0;
            if (computeTime) {
                computedTime = log.date.diff(previous.date);
            }
            return {total: total+computedTime, previous: log};
        }, { total: 0, lastState: undefined});

        const lastLog = this.getLastLog();
        if (lastLog?.type === 'START') {
            totalTime += dayjs().diff(lastLog.date);
        }

        return totalTime;
    }
}
