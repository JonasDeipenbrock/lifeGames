import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import "./index.css";
import GameOfLife from "./routes/GameOfLife/GameOfLife";
import LifeEngine from "./routes/LifeEngine/LifeEngine";
import Root from "./routes/Root";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/gameOfLife",
                element: <GameOfLife />,
            },
            {
                path: "/lifeEngine",
                element: <LifeEngine />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
