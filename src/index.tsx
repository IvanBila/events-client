import React from 'react';
import ReactDOM from 'react-dom/client';
import { Outlet } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import Events from './pages/Events';
import NotFound from './pages/NotFound';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const links = [
  {
    link: '/sign-in',
    label: 'Sign in',
  },
];
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home links={links} />} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/events" element={<Events />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
