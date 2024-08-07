import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import UserService from "../services/user-service.js";
import MessageBox from "../layouts/MessageBox.jsx";

import {setLoginErrorFalse} from "../store/user-store";

function ProfilePage() {
    const dispatch = useDispatch();

    const is_login_error = useSelector(state => state.userSlice.is_login_error);

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
        dispatch(UserService.userLogin(user_data));

    }

    useEffect(() => {
        if(is_login_error === true){
            setTimeout(() => {
                dispatch(setLoginErrorFalse());
            }, 1500)
        }
    }, [is_login_error])


    return (    
        <div style={{ fontFamily: 'Saire Condensed' }} className='flex justify-center items-center h-screen'>

            {
                is_login_error &&
                    <MessageBox color={'bg-red-500'} message={'User Not Found'} />
            }

            <div className='flex flex-col w-1/4 rounded-lg shadow-lg justify-center items-center p-5'>
                <span className='text-4xl my-8 font-bold'>
                    Welcome Back
                </span>
                <div className='flex flex-col  w-full justify-center items-center'>
                    
                    {/* <form onSubmit={signIn}> */}
                        <input className='bg-gray-100 p-2 rounded-lg outline-none my-3 w-full' type="text" name="email" id="email" onChange={changeUsernameInform} placeholder='Username or Email' />
                        <input className='bg-gray-100 p-2 rounded-lg outline-none my-3 w-full' type="password" name="password" id="password" onChange={changePasswordInform} placeholder='Password' />
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