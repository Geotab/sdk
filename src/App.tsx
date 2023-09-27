import React, {createContext} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Header, Navbar} from './components';
import LandingPage from "./pages";
import Introduction from "./pages/myGeotab/introduction";
import WhatsNew from './pages/myGeotab/whatsNew';
import GettingStarted from './pages/myGeotab/guides/gettingStarted';
import Methods from './pages/myGeotab/apiReference/methods';
import Objects from './pages/myGeotab/apiReference/objects';

import './App.css';

function App() {
  return (
      <Router>
        <Header />
        <Navbar />
        <Routes>
          <Route path='/' Component={LandingPage} />
          <Route path='/introduction' Component={Introduction} />
          <Route path='/whatsNew' Component={WhatsNew} />
          <Route path='/gettingStarted' Component={GettingStarted} />
          <Route path='/methods' Component={Methods} />
          <Route path='/objects' Component={Objects} />
        </Routes>
      </Router>
  );
}

export default App;
