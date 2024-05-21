
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import AdminService from '../../services/admin-service';
import { setCreateCompanyMessageFalse, setCreateCompanyCondFalse } from '../../store/admin-store';

import LoadingButton from '@mui/lab/LoadingButton';

function AddCompanyComponent() {

    const dispatch = useDispatch();
    const create_company_message = useSelector((state) => state.adminSlice.create_company_message);
    const create_company_cond = useSelector((state) => state.adminSlice.create_company_cond);
    const [err_msg, setErrMsg] = useState(false);

    let [company_data, setCompanyData] = useState({
        company_name: '',
        email: '',
        phone: '',
        country: '',
    });

    function createNewCompany() {
        if (company_data.company_name.trim() !== '') {
            dispatch(AdminService.createCompany(company_data));
        }
        else {
            console.log('is empty');
            setErrMsg(true);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            if (create_company_message) {
                dispatch(setCreateCompanyMessageFalse());
            }
        }, 2000)
    }, [create_company_message, create_company_cond]);

    useEffect(() => {
        if (create_company_cond) {
            setCompanyData((each) => ({
                ...each,
                company_name: '',
                email: '',
                phone: '',
                country: '',
            }));
        };
    },);

    useEffect(()=>{
        setTimeout(()=>{
            setErrMsg(false);
        },2000)
    },[err_msg])

    return (
        <div className='flex flex-col'>

            {
                create_company_message && <span className='text-green-500 w-full text-end'>New Company Successfully Created</span>
            }

            {
                err_msg && <span className='text-red-500 w-full text-end'>Company Name Cant Be Empty</span>
            }


            <div className='flex justify-between text-sm my-3'>
                <div className='w-1/2 mr-2'>
                    <span className='text-gray-400'>Email</span>
                    <input className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg outline-none' type="text" placeholder='company@yandex.ru' value={company_data.email}
                        onChange={(event) => {
                            setCompanyData((each) => ({
                                ...each,
                                email: event.target.value
                            }))
                        }} />
                </div>
                <div className='w-1/2 ml-2'>
                    <span className='text-gray-400'>Phone</span>
                    <input className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg outline-none' type="text" placeholder='+(8) 9656666666' value={company_data.phone}
                        onChange={(event) => {
                            setCompanyData((each) => ({
                                ...each,
                                phone: event.target.value
                            }))
                        }} />
                </div>
            </div>
            <div className='text-sm my-3'>
                <p className='text-gray-400'>Country</p>
                <select name="" id="" className='bg-gray-100 w-full my-2 px-2 py-4 rounded-lg text-gray-800 outline-none'
                    onChange={(event) => {
                        setCompanyData((each) => ({
                            ...each,
                            country: event.target.value
                        }))
                    }}>
                    <option value="Azerbaijan" >Azerbaijan</option>
                    <option value="Russia" >Russia</option>
                    <option value="Turkiye" >Turkiye</option>
                </select>
            </div>
            <div className='text-sm'>
                <span className='text-gray-400'>Company Name</span>
                <input className='bg-gray-100 w-full mb-4 mt-2 px-2 py-4 rounded-lg outline-none' type="text" placeholder='Company Name...' value={company_data.company_name}
                    onChange={(event) => {
                        setCompanyData((each) => ({
                            ...each,
                            company_name: event.target.value
                        }))
                    }}
                />


            </div>
            <div className='opacity-70'>
                {
                    !create_company_cond ?
                        <button onClick={createNewCompany} className='bg-orange-300 text-gray-800 hover:bg-orange-400 duration-200  w-full py-4 rounded-lg my-4 text-lg'>
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

export default AddCompanyComponent