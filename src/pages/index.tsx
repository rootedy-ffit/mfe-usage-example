import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//Routes
import Login from './login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);

function App() {
    return (<RouterProvider router={router} />);
};

export default App;
