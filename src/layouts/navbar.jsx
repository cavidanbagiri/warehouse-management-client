
import React from 'react'
import { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import NavbarItemComponent from '../components/navbar/navbar_item-component';
import ProfilePage from '../pages/ProfilePage';

import { TbHexagonLetterWFilled } from "react-icons/tb";

function Navbar() {
    const is_auth = useSelector((state) => state.userSlice.is_auth);
    const [homeIsShown, setHomeIsShown] = useState(false);
    const [stockIsShown, setStockIsShown] = useState(false);
    const [createMaterialIsShown, setcreateMaterialIsShown] = useState(false);
    const [warehouseIsShown, setWarehouseIsShown] = useState(false);
    const [userIsShown, setUserIsShown] = useState(false);

    return (
        <div className='relative '>

            {/* Check if User Authenticated */}
            {is_auth ?
                <div className='sticky top-0 left-0 z-20  float-left h-screen flex flex-col items-center p-2 rounded-md bg-white'>

                    <Link to='/'>
                        <TbHexagonLetterWFilled className='text-orange-400 mt-4 mb-2 text-4xl ' />
                    </Link>

                    {/* Home Page */}
                    <Link to='/'>
                        <NavbarItemComponent isShown={homeIsShown} setIsShown={setHomeIsShown} iconName={'fa-house'} iconSize={'text-xl'} iconValue={'Home'} />
                    </Link>

                    <Link to="/creatematerial">
                        <NavbarItemComponent isShown={createMaterialIsShown} setIsShown={setcreateMaterialIsShown} iconName={'fa-plus'} iconSize={'text-2xl'} iconValue={'Create'} />
                    </Link>

                    <Link to="/warehouse">
                        <NavbarItemComponent isShown={warehouseIsShown} setIsShown={setWarehouseIsShown} iconName={'fa-chart-area'} iconSize={'text-xl'} iconValue={'Warehouse'} />
                    </Link>

                    {/* Stock Page */}
                    <Link to="/stock">
                        <NavbarItemComponent isShown={stockIsShown} setIsShown={setStockIsShown} iconName={'fa-warehouse'} iconSize={'text-xl'} iconValue={'Stock'} />
                    </Link>

                    <Link to="/profile">
                        <NavbarItemComponent isShown={userIsShown} setIsShown={setUserIsShown} iconName={'fa-circle-user'} iconSize={'text-2xl'} iconValue={'Profile'} />
                    </Link>

                </div>
                :
                /* If not send to login page */
                <ProfilePage />
            }

            <Outlet />
        </div>
    )
}

export default Navbar
