
import React from 'react'
import { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import NavbarItemComponent from './navbar_item-component';


function Navbar() {

    const [homeIsShown, setHomeIsShown] = useState(false);
    const [stockIsShown, setStockIsShown] = useState(false);
    const [areaIsShown, setAreaIsShown] = useState(false);
    const [userIsShown, setUserIsShown] = useState(false);

    return (
        <div className=''>
            <div className=' bg-indigo-800 float-left h-screen flex flex-col items-center p-2'>

                {/* Home Page */}
                <Link to='/'>
                    <NavbarItemComponent isShown={homeIsShown} setIsShown={setHomeIsShown} iconName={'fa-house'} iconSize={'text-xl'} iconValue={'Home'} />
                </Link>

                {/* Stock Page */}
                <Link to="/stock">
                    <NavbarItemComponent isShown={stockIsShown} setIsShown={setStockIsShown} iconName={'fa-warehouse'} iconSize={'text-xl'} iconValue={'Stock'} />
                </Link>

                <Link to="/">
                    <NavbarItemComponent isShown={areaIsShown} setIsShown={setAreaIsShown} iconName={'fa-chart-area'} iconSize={'text-xl'} iconValue={'Area'} />
                </Link>
                
                <Link to="/profile">
                    <NavbarItemComponent isShown={userIsShown} setIsShown={setUserIsShown} iconName={'fa-circle-user'} iconSize={'text-2xl'} iconValue={'Profile'} />
                </Link>

            </div>

            <Outlet />
        </div>
    )
}

export default Navbar
