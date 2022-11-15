import React from 'react';
import { Outlet } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
