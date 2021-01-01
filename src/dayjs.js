import * as dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/fr';

dayjs.locale('fr');
dayjs.extend(duration);
