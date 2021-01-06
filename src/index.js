import './style/application.scss';
import './style';
import { library } from '@fortawesome/fontawesome-svg-core'
import App from './components/app';
import './dayjs'

import {faPlusSquare} from '@fortawesome/free-regular-svg-icons/faPlusSquare';
import {faMinusSquare} from '@fortawesome/free-regular-svg-icons/faMinusSquare';
import {faPlay} from '@fortawesome/free-solid-svg-icons/faPlay'
import {faPause} from "@fortawesome/free-solid-svg-icons/faPause";

library.add(faPlusSquare, faMinusSquare, faPlay, faPause)

export default App;
