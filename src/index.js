import './style/application.scss';
import './style';
import { library } from '@fortawesome/fontawesome-svg-core'
import App from './components/app';
import './dayjs'

import {faMinusSquare, faPlusSquare} from '@fortawesome/free-regular-svg-icons';
import {faPlay} from '@fortawesome/free-solid-svg-icons'
import {faPause} from "@fortawesome/free-solid-svg-icons/faPause";

library.add(faPlusSquare, faMinusSquare, faPlay, faPause)

export default App;
