import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginLayout from "./loginLayout";
import CreateAccount from "./components/createAccount";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginLayout/>,
    },
    {
      path: "/create-account",
      element: <CreateAccount/>
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
