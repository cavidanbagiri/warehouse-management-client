import {
    createBrowserRouter,

} from "react-router-dom";

import DashboardPage from '../pages/DashboardPage.jsx';
import StockPage from '../pages/StockPage.jsx';
import ProfilePage from "../pages/ProfilePage.jsx";
import Navbar from "../layouts/Navbar.jsx";
import CreateMaterialPage from "../pages/CreateMaterialPage.jsx";
import WarehousePage from "../pages/WarehousePage.jsx";


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
                path: "/warehouse",
                element: <WarehousePage/>
            },
            {
                path: "/creatematerial",
                element: <CreateMaterialPage/>
            },
            {
                path: "/profile",
                element: <ProfilePage/>
            }
        ]
    },
]);

export default router;