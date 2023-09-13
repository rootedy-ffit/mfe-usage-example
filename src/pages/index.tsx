import * as React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//Routes
import Login from './Login';
import Home from './Home';
import ViewPdf from './ViewPdf';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/pdf/:id",
    element: <ViewPdf />,
  },
]); 

function App() {
    return (<RouterProvider router={router} />);
};

export default App;
