import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import "/node_modules/flag-icons/css/flag-icons.min.css";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import Root from './routes/Root';
import ErrorPage from './routes/error/ErrorPage';
import HomePageRoute from './routes/homepage/HomePageRoute';
import NewRoomRoute from './routes/room/NewRoomRoute';
import RoomRoute from './routes/room/id/RoomRoute';
import LoadingRoute from './routes/loading/LoadingRoute';

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
      },
      {
        path: "/loading",
        element: <LoadingRoute />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
