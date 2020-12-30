import * as React from 'react';
import {render} from 'react-dom';
import Application from './Application';
import './index.scss';
import axios from "axios";
axios.defaults.withCredentials = true

render(<Application/>, document.getElementById('root'));
