import { h } from 'preact';
import TasksList from "../src/components/TasksList";
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from 'enzyme';
import TimeLog from "../src/models/TimeLog";
import dayjs from "dayjs";

describe('Initial Test of the TasksList', () => {
	let tasks = [];
	beforeEach(() => {
		tasks = [
			{ name: 'Task 1', timeLog: [
				new TimeLog({type: TimeLog.TYPE_START, date: dayjs('2020-12-31 10:00:00')}),
				new TimeLog({type: TimeLog.TYPE_PAUSE, date: dayjs('2020-12-31 12:00:00')}),
				new TimeLog({type: TimeLog.TYPE_START, date: dayjs('2020-12-31 14:00:00')}),
				new TimeLog({type: TimeLog.TYPE_PAUSE, date: dayjs('2020-12-31 16:00:00')}),
			]},
			{ name: 'Task 2', timeLog: []},
			{ name: 'Task 3', timeLog: []},
		];
	})
	test('Table renders 3 items', () => {
		const context = shallow(<TasksList tasks={tasks} />);
		expect(context.find('TaskRow').length).toBe(3);
	});
});
