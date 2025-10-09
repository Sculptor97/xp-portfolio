import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Desktop from './src/pages/Desktop';
import Boot from './src/pages/Boot';
import Login from './src/pages/Login';
import Welcome from './src/pages/Welcome';
import ExplorerDemo from '@/pages/ExplorerDemo';
import Contact from '@/pages/contact';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Boot />} />
      <Route path="desktop" element={<Desktop />} />
      <Route path="login" element={<Login />} />
      <Route path="welcome" element={<Welcome />} />
      <Route path="demo" element={<ExplorerDemo />} />
      <Route path="contact" element={<Contact />} />
    </>
  )
);

export default router;
