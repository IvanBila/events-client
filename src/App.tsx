import React from 'react';
import { Outlet } from 'react-router-dom';

import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: 'inter, sans-serif',
        colorScheme: 'light',
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Outlet />
    </MantineProvider>
  );
}

export default App;
