import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from '../store/user-store';

function ProfilePage() {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const changeUsernameInform = (event) => {
        setUsername(event.target.value);
    }
    const changePasswordInform = (event) => {
        setPassword(event.target.value);
    }

    async function signIn() {
        const user_data = {
            email: username,
            password: password
        }
        // useDispatch
        dispatch(userLogin(user_data));
    }


    return (    
        <div style={{ fontFamily: 'Saire Condensed' }} className='flex justify-center items-center h-screen'>

            <div className='flex flex-col w-1/4 rounded-lg shadow-lg justify-center items-center p-5'>
                <span className='text-4xl my-8 font-bold'>
                    Welcome Back
                </span>
                <div className='flex flex-col  w-full justify-center items-center'>
                    
                    {/* <form onSubmit={signIn}> */}
                        <input  className='bg-gray-100 p-2 rounded-lg outline-none my-3 w-full' type="text" name="" id="username" onChange={changeUsernameInform} placeholder='Username or Email' />
                        <input  className='bg-gray-100 p-2 rounded-lg outline-none my-3 w-full' type="password" name="" id="email" onChange={changePasswordInform} placeholder='Password' />
                        <button onClick={signIn} className='bg-slate-900 w-full px-5 py-2 my-3 rounded-lg text-white font-bold hover:bg-slate-800 duPasswordon-300'>
                            Sign In
                        </button>
                    {/* </form> */}
                    <span className='w-full text-xs underline duration-300 cursor-pointer hover:text-blue-400'>
                        Forget Password
                    </span>
                </div>
            </div>

        </div>
    )
}

export default ProfilePage