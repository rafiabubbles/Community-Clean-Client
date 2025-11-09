import { createBrowserRouter } from "react-router";
import Root from "../Pages/Root";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

import UpdateProfile from "../Pages/UpdateProfile";
import ErrorPage from "../Pages/ErrorPage";
import PrivateRoute from "../Components/PrivateRoute";
import CategoryCard from "../Components/CategoryCard";
import IssueDetails from "../Pages/IssueDetails";
import AddIssue from "../Pages/AddIssue";
import AllIssue from "../Pages/AllIssue";
import MyIssue from "../Pages/MyIssue";
import MyContribution from "../Pages/MyContribution";

export const router = createBrowserRouter([{
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
        {
            index: true,
            element: <Home />,
        },
        {
            path: "/home",
            element: <Home />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/categoryCard/:categoryId",
            element: <CategoryCard />
            ,
        },
        {
            path: "/issue/:id",
            element: <IssueDetails />,
        },
        {
            path: "/add-issue",
            element: <PrivateRoute><AddIssue /></PrivateRoute>,
        },
        {
            path: "/all-issues",
            element: <PrivateRoute><AllIssue /></PrivateRoute>,
        },
        {
            path: "/my-issues",
            element: <PrivateRoute><MyIssue /></PrivateRoute>,
        }, {
            path: "/my-contributions",
            element: <PrivateRoute><MyContribution /></PrivateRoute>,
        },
        {
            path: "/update-profile",
            element: <PrivateRoute><UpdateProfile /></PrivateRoute>,
        },
    ]
}]);