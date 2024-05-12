import React from 'react'

function NavbarItemComponent(props) {
    return (
        <div className='relative text-white'>
            <span
                onMouseEnter={() => props.setIsShown(true)}
                onMouseLeave={() => props.setIsShown(false)}>
                <i className={`fa-solid ${props.iconName} ${props.iconSize} cursor-pointer my-3 hover:bg-slate-400 duration-300 rounded-md p-1`}></i>
               
            </span>
            {
                props.isShown && <span
                    className="duration-150 absolute top-3 left-10 ml-1 bg-slate-800 py-2 px-4 text-white text-md rounded-md flex">
                    {props.iconValue}
                </span>
            }
            
        </div>
    )
}

export default NavbarItemComponent