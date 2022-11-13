'use strict';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {ApiRunner} from './components'

const domContainer = document.querySelector('#runnerRoot');
console.log('domContainer:', domContainer)
console.log(domContainer)
const root = ReactDOM.createRoot(domContainer);
root.render(<ApiRunner/>);
// const domContainer = document.querySelector('#sessionSelector');
// const root = ReactDOM.createRoot(domContainer);
// root.render(<SessionSelector />);