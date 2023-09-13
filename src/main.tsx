import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Root from './routes/Root';
import ErrorPage from './routes/error/ErrorPage';
import HomePageRoute from './routes/homepage/HomePageRoute';
import NewRoomRoute from './routes/room/NewRoomRoute';
import RoomRoute from './routes/room/id/RoomRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePageRoute />
      },
      {
        path: "/room",
        element: <NewRoomRoute />
      },
      {
        path: "/room/:id",
        element: <RoomRoute />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
