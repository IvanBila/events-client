import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import CreateEvent from './pages/CreateEvent';
import Events from './pages/Events';

interface Event {
  id: number;
  title: string;
  description: string;
  start: Date;
  end: Date;
}

function App() {
  const [value, setValue] = useState<Date | null>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    fetch('http://localhost:8080/events')
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      });
  }, []);

  interface formDataType {
    [key: string]: FormDataEntryValue;
  }
  const responseBody: formDataType = {};

  const inputChangeHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    formData.forEach(
      (value, property: string) => (responseBody[property] = value)
    );
    console.log(JSON.stringify(responseBody));
    const result = await fetch('http://localhost:8080/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(responseBody),
    });
    await result.json();
  };

  const links = [
    {
      link: '/sign-in',
      label: 'Sign in',
    },
  ];
  return (
    <Routes>
      <Route path="/" element={<Home links={links} />} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/events" element={<Events />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
