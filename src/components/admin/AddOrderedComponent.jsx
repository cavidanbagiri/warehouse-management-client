
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import AdminService from '../../services/admin-service';
import { setCreateOrderedMessageFalse, 
    setCreateOrderedAvailableFalse,
    setCreateOrderedCondFalse } from '../../store/admin-store';

import LoadingButton from '@mui/lab/LoadingButton';

function AddOrderedComponent() {


    const dispatch = useDispatch();
    const create_ordered_message = useSelector((state) => state.adminSlice.create_ordered_message);
    const create_ordered_cond = useSelector((state) => state.adminSlice.create_ordered_cond);
    const create_ordered_available = useSelector((state) => state.adminSlice.create_ordered_available);
    const [err_msg, setErrMsg] = useState(false);

    let groups = useSelector((state) => state.adminSlice.groups);
    let [ordered_data, setOrderedData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: 'password',
        is_admin: false,
        projectId: 2,
        groupId: 1,
        group_name: ''
    });

    function createNewOrdered() {
        if(ordered_data.firstName.trim() === '' || ordered_data.lastName.trim() === ''){
           setErrMsg(true);
        }
        else{
            dispatch(AdminService.createOrdered(ordered_data));
        }
    }

    // Fetch All Groups
    useEffect(() => {
        console.log('one time work');
        dispatch(AdminService.fetchGroups());
    }, [])

    // Control after creating new ordered conditions and messages
    useEffect(() => {
        setTimeout(() => {
            if(create_ordered_message){
                dispatch(setCreateOrderedMessageFalse());
                dispatch(setCreateOrderedCondFalse());
            }
        }, 2000)
    }, [create_ordered_message, create_ordered_cond]);

    useEffect(() => {
        setTimeout(() => {
            if(create_ordered_available){
                dispatch(setCreateOrderedAvailableFalse());
                dispatch(setCreateOrderedCondFalse());
            }
        }, 2000)
    }, [create_ordered_available, create_ordered_cond]);

    useEffect(() => {
        if (create_ordered_cond) {
            setOrderedData((each) => ({
                ...each,
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                password: 'password',
                is_admin: false,
                projectId: 2,
                groupId: 1,
                group_name: ''
            }));
        };
    });

    useEffect(()=>{
        setTimeout(()=>{
            setErrMsg(false);
        },2000)
    },[err_msg])

    return (
        <div className=''>

            {
                create_ordered_message && <span className='text-green-500 w-full text-end'>New Ordered Successfully Created</span>
            }
            
            {
                err_msg && <span className='text-red-500 w-full text-end'>First name or Last name cant be empty</span>
            }

            {
                create_ordered_available && <span className='text-red-500 w-full text-end'>User Already Available</span>
            }

            <div className='flex justify-between text-sm my-3'>
                <div className='w-1/2 mr-2'>
                    <span className='text-gray-400'>Email</span>
                    <input className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg outline-none' type="text" placeholder='@gmail.com' value={ordered_data.email}
                        onChange={(event) => {
                            setOrderedData((each) => ({
                                ...each,
                                email: event.target.value
                            }))
                        }} />
                </div>
                <div className='w-1/2 ml-2'>
                    <span className='text-gray-400'>Phone</span>
                    <input className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg outline-none' type="text" placeholder='+(8) 9656666666'  value={ordered_data.phoneNumber}
                        onChange={(event) => {
                            setOrderedData((each) => ({
                                ...each,
                                phoneNumber: event.target.value
                            }))
                        }} />
                </div>
            </div>
            <div className='flex justify-between text-sm my-3'>
                <div className='w-1/2 mr-2'>
                    <span className='text-gray-400'>First name</span>
                    <input className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg outline-none' type="text" placeholder=''  value={ordered_data.firstName}
                        onChange={(event) => {
                            setOrderedData((each) => ({
                                ...each,
                                firstName: event.target.value
                            }))
                        }} />
                </div>
                <div className='w-1/2 ml-2'>
                    <span className='text-gray-400'>Last name</span>
                    <input className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg outline-none' type="text" placeholder=''  value={ordered_data.lastName}
                        onChange={(event) => {
                            setOrderedData((each) => ({
                                ...each,
                                lastName: event.target.value
                            }))
                        }} />
                </div>
            </div>
            <div className='text-sm my-3'>
                <p className='text-gray-400'>Group</p>
                <select name="" id="" className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg text-gray-800 outline-none'
                    onChange={(event) => {
                        setOrderedData((each) => ({
                            ...each,
                            groupId: event.target.value,

                        }))
                    }}
                >
                    {groups.map((item) => (
                        <option key={item.id} value={item.id} >{item.group_name}</option>
                    ))}
                </select>
            </div>
            <div className='opacity-70'>

                {
                    !create_ordered_cond ?
                        <button onClick={createNewOrdered} className='bg-orange-300 text-gray-800 hover:bg-orange-400 duration-200  w-full py-4 rounded-lg my-4 text-lg'>
                            Confirm
                        </button>
                        :
                        <LoadingButton loading variant="outlined" className='text-black w-full p-4'>
                            Please Submit
                        </LoadingButton>
                }

            </div>
        </div>
    )
}

export default AddOrderedComponent