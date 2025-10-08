import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Desktop from './src/pages/Desktop';
import Boot from './src/pages/Boot';
import Login from './src/pages/Login';
import Welcome from './src/pages/Welcome';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Boot />} />
      <Route path="desktop" element={<Desktop />} />
      <Route path="login" element={<Login />} />
      <Route path="welcome" element={<Welcome />} />
    </>
  )
);

export default router;
