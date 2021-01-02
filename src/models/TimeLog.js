import dayjs from "dayjs";

export default class TimeLog {
    static TYPE_START = 'START';
    static TYPE_PAUSE = 'PAUSE';

    date;
    description = '';
    type;

    static getTypes() {
        return [
            this.TYPE_START,
            this.TYPE_PAUSE
        ]
    }

    static isValidType(type) {
        return TimeLog.getTypes().indexOf(type) !== -1;
    }

    constructor(attr) {
        this.date = dayjs();


        if (attr?.description) {
            this.description = attr.description;
        }
        if (attr?.date) {
            this.date = dayjs(attr.date);
        }
        if (attr?.type) {
            if (this.constructor.isValidType(attr.type)) {
                this.type = attr.type;
            }
            else {
                throw `Invalid type "${attr.type}" passed`;
            }
        }
    }

}

