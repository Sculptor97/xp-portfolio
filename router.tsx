import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Desktop from './src/pages/Desktop';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Desktop />} />
    </>
  )
);

export default router;
