
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { setOrderSelectionInformationToggleFalse } from '../../store/stock-store';

function OrderInformationComponent() {

  const dispatch = useDispatch();
  const po_data = useSelector((state)=>state.stockSlice.po_data);

  return (
    <div className='flex flex-row justify-between z-10 fixed top-0 right-0 w-full h-full bg-black bg-opacity-30'>
      <div className='w-1/2' ></div>
      <div className='flex flex-col bg-white w-1/2' >
        {/* Close Component Section */}
        <div className='flex justify-end p-5 text-end'>
          <span
            onClick={() => {
              dispatch(setOrderSelectionInformationToggleFalse());
            }}
            className='p-2 hover:bg-gray-100 hover:cursor-pointer rounded-lg'>
            <IoMdClose className='text-2xl' />
          </span>
        </div>
        <div className='flex flex-col p-4 bg-red-400'>
        order Information Section
            {po_data.id}
        </div>
      </div>
    </div>
  )
}

export default OrderInformationComponent