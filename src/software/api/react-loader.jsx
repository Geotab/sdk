'use strict';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApiRunner } from './components';

const domContainer = document.querySelector('#runnerRoot');
const root = ReactDOM.createRoot(domContainer);
root.render(<ApiRunner/>);

