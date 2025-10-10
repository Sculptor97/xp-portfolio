import GridOverlay from './components/GridOverlay';

import { RouterProvider } from 'react-router-dom';
import router from '../router';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './lib/queryClient';
import { AppProvider } from './hooks/useAppManager';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <RouterProvider router={router} />
        <GridOverlay />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
