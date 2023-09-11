import * as React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//Routes
import Login from './Login';
import Home from './Home';
import ViewPdf from './ViewPdf';
import Forms from './Forms';

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
  {
    path: "/forms",
    element: <Forms />,
  },
]); 

function App() {
    return (<RouterProvider router={router} />);
};

export default App;
