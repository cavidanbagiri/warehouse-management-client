
import '../css/dropdown.css';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { AiOutlineExclamationCircle } from "react-icons/ai";


function MessageBox(props) {
  return (
    <div className={`z-20 fixed bottom-10 flex w-full justify-end message-box-animation `}>
        {
            props.color === 'bg-green-500'
                ?
            <div className= {` bg-green-500 rounded-lg flex items-center mr-20 text-lg  py-4 px-10 text-white shadow-xl`}>
            <IoMdCheckmarkCircleOutline className={'text-3xl mr-3 text-green-700 '} /> {props.message}
            </div>
                :
            <div className= {` bg-red-500 rounded-lg flex mr-20 text-lg py-4 px-10 text-white shadow-xl`}>
                <AiOutlineExclamationCircle className={'text-3xl mr-3 text-red-700'} /> {props.message}
            </div>
        }
    </div>
  )
}

export default MessageBox