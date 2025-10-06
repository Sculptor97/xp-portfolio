import GridOverlay from './components/GridOverlay';

import { RouterProvider } from 'react-router-dom';
import router from '../router';
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <GridOverlay />
    </>
  );
}

export default App;
