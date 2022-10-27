import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import GameOfLife from "./routes/GameOfLife/GameOfLife";
import LifesGame from "./routes/LifesGame/LifesGames";
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
                path: "/lifesGame",
                element: <LifesGame />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
