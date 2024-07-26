import {
    createBrowserRouter,

} from "react-router-dom";

import DashboardPage from '../pages/DashboardPage.jsx';
import StockPage from '../pages/StockPage.jsx';
import ProfilePage from "../pages/ProfilePage.jsx";
import Navbar from "../layouts/Navbar.jsx";
import CreateMaterialPage from "../pages/CreateMaterialPage.jsx";
import WarehousePage from "../pages/WarehousePage.jsx";
import AreaPage from "../pages/AreaPage.jsx";
import AdminPage from "../pages/AdminPage.jsx";


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
            },
            {
                path: "/area",
                element: <AreaPage/>
            },
            {
                path: "/admin",
                element: <AdminPage/>
            }
        ]
    },
]);

export default router;