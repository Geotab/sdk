'use strict';
console.log("SESSION_0");
import React from 'react';
import ReactDOM from 'react-dom';
import { SessionSelector } from './components'
console.log("SESSION");

const domContainer = document.querySelector('#sessionSelector');
const root = ReactDOM.createRoot(domContainer);
root.render(<SessionSelector />);