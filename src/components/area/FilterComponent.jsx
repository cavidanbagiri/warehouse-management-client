import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AreaService from "../../services/area-service";

function FilterComponent() {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.userSlice.user);

    // Filter Section Hooks
    const [card_number, setCardNNumber] = useState('');
    const [material_name, setMaterialName] = useState('');
    const [po, setPO] = useState('');
    const [createdAt, setSelectedDate] = useState('');
   
    
    const searchFunc = () => {
        let data = {
            card_number: card_number.toString(),
            material_name: material_name.toString(),
            createdAt: createdAt.toString(),
            po: po,
            projectId: user.projectId
        };
        console.log(data);
        dispatch(AreaService.filterAreaData(data));
    }

    return (

        <div className="flex flex-col w-full mt-5">
            <div className='flex px-4 justify-start w-full'>
                <span className='text-3xl  tracking-tighter mb-3' style={{ fontWeight: 500, fontFamily: 'IBM Plex Sans' }}>Filter</span>
            </div>

            <div className='flex items-end justify-between w-full mb-3 px-4'>

                <div className='flex'>

                    {/* Selected Date Filter */}
                    <div className='mr-3'>
                        <p className='text-xs text-gray-400 pl-1'>Date</p>
                        <input
                            className='text-xs bg-white border border-gray-300 rounded-lg w-28 p-2 outline-none text-center hover:border-orange-300 '
                            type="date" name="" id="" onChange={(e) => {
                                setSelectedDate(e.target.value)
                            }} />
                    </div>

                    {/* Doc Number Side */}
                    <div className='mr-3'>
                        <p className='text-xs text-gray-400 pl-1'>Card Number</p>
                        <input value={card_number}
                            className='placeholder-black text-xs bg-white border border-gray-300 rounded-lg w-24 p-2 outline-none text-center hover:border-orange-300 '
                            type="text" placeholder='Card Number' onChange={(e) => {
                                setCardNNumber(e.target.value);
                            }} />
                    </div>

                    {/* Material name */}
                    <div className='mr-3'>
                        <p className='text-xs text-gray-400 pl-1'>Material Name</p>
                        <input value={material_name}
                            className='placeholder-black text-xs bg-white border border-gray-300 rounded-lg w-64 p-2 outline-none text-center  hover:border-orange-300 '
                            type="text" placeholder='Material Name' onChange={(e) => {
                                setMaterialName(e.target.value);
                            }} />
                    </div>

                    {/* Material name */}
                    <div className='mr-3'>
                        <p className='text-xs text-gray-400 pl-1'>Order Num</p>
                        <input value={po}
                            className='placeholder-black text-xs bg-white border border-gray-300 rounded-lg w-24 p-2 outline-none text-center hover:border-orange-300 '
                            type="text" placeholder='Order Num' onChange={(e) => {
                                setPO(e.target.value);
                            }} />
                    </div>

                </div>

                <div className=''>
                    <p className='text-xs text-gray-400 pl-1'>Search</p>
                    <button
                        className='text-sm bg-green-500  border border-gray-300 rounded-lg p-2 w-24 text-ellipsis overflow-hidden text-nowrap outline-none text-white hover:bg-white hover:text-green-500 duration-200'
                        onClick={searchFunc}>
                        Search
                    </button>
                </div>

            </div>

        </div>

    )
}

export default FilterComponent