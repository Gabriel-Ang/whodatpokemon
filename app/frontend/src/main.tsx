import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';

// Pages
import ErrorPage from './pages/ErrorPage.tsx'
import PlayPage from './pages/PlayPage.tsx'
import HomePage from './pages/HomePage.tsx'

// Layout
import MainLayout from './layout/MainLayout.tsx'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/play",
        element: <PlayPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>,
)
