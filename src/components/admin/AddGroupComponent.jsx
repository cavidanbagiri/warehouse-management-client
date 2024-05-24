
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import AdminService from '../../services/admin-service';
import { setCreateGroupMessageFalse } from '../../store/admin-store';

import LoadingButton from '@mui/lab/LoadingButton';

function AddOrderedComponent() {


    const dispatch = useDispatch();
    const create_group_message = useSelector((state) => state.adminSlice.create_group_message);
    const create_group_cond = useSelector((state) => state.adminSlice.create_group_cond);
    const [err_msg, setErrMsg] = useState(false);

    let groups = useSelector((state) => state.adminSlice.groups);
    let [group_data, setGroupData] = useState({
        group_name: '',
    });

    function createNewGroup() {
        if (group_data.group_name.trim() === '') {
            setErrMsg(true);
        }
        else {
            dispatch(AdminService.createGroup(group_data));
        }
    }

    // Fetch All Groups
    useEffect(() => {
        dispatch(AdminService.fetchGroups());
    }, [])

    // Control after creating new ordered conditions and messages
    useEffect(() => {
        setTimeout(() => {
            if (create_group_cond) {
                dispatch(setCreateGroupMessageFalse());
            }
        }, 2000)
    }, [create_group_message, create_group_cond]);

    useEffect(() => {
        if (create_group_cond) {
            setGroupData((each) => ({
                ...each,
                group_name: '',
            }));
        };
    });

    useEffect(() => {
        setTimeout(() => {
            setErrMsg(false);
        }, 2000)
    }, [err_msg])

    return (
        <div className=''>

            {
                create_group_message && <span className='text-green-500 w-full text-end'>New Group Successfully Created</span>
            }

            {
                err_msg && <span className='text-red-500 w-full text-end'>Group name cant be empty</span>
            }

            <div className='flex flex-col justify-between text-sm my-3'>

                <div className='flex  justify-between text-sm my-3'>
                    <div className='w-full'>
                        <span className='text-gray-400'>Group name</span>
                        <input className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg outline-none' type="text" placeholder='' value={group_data.group_name}
                            onChange={(event) => {
                                setGroupData((each) => ({
                                    ...each,
                                    group_name: event.target.value
                                }))
                            }} />
                    </div>
                </div>
                <div className='text-sm my-3'>
                    <p className='text-gray-400'>Available Group</p>
                    <select name="" id="" className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg text-gray-800 outline-none'
                        onChange={(event) => {
                            setGroupData((each) => ({
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
                        !create_group_cond ?
                            <button onClick={createNewGroup} className='bg-orange-300 text-gray-800 hover:bg-orange-400 duration-200  w-full py-4 rounded-lg my-4 text-lg'>
                                Confirm
                            </button>
                            :
                            <LoadingButton loading variant="outlined" className='text-black w-full p-4'>
                                Please Submit
                            </LoadingButton>
                    }

                </div>
            </div>
        </div>
    )
}

export default AddOrderedComponent