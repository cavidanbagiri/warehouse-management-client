import {
    createBrowserRouter,

} from "react-router-dom";

import DashboardPage from '../pages/dashboard-page.jsx';
import StockPage from '../pages/stock-page.jsx';
import ProfilePage from "../pages/profile-page.jsx";
import Navbar from "../layouts/navbar.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Navbar/>,
        children: [
            {
                path: "/",
                element: <DashboardPage/>
            },
            {
                path: "/stock",
                element: <StockPage/>
            },
            {
                path: "/profile",
                element: <ProfilePage/>
            }
        ]
    },
]);

export default router;