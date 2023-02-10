import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// redux
import { Provider } from "react-redux";
import { store } from "./store";

// component
import App from "./App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
]);

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
