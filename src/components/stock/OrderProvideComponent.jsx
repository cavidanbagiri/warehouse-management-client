
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { setOrderProvideMessageBoxFalse, setOrderSelectionProvideToggleFalse } from '../../store/stock-store';

import OrderProvideTableHeaderComponent from './OrderProvideTableHeaderComponent';
import OrderProvideTableRowComponent from './OrderProvideTableRowComponent';
import MessageBox from "../../layouts/MessageBox";
import CustomLoadingButton from '../common/CustomLoadingButton'
import DropDownComponent from "../common/DropdownComponent";

import StockService from "../../services/stock-service";

import { filterGroup } from "../../store/common-store";

function OrderInformationComponent() {

  const dispatch = useDispatch();

  const selected_items = useSelector(state => state.stockSlice.selected_items);
  const order_provide = useSelector(state => state.stockSlice.order_provide);
  const filtered_groups = useSelector(state => state.commonSlice.filtered_groups);

  const [show_message_box, setShowMessageBox] = useState(false);
  const [show_message_box_message, setShowMessageBoxMessage] = useState('');

  const [username, setUsername] = useState('');
  const [card_number, setCardNumber] = useState('');

  const [group_dropdown, setGroupDropdown] = useState(false);
  const [group, setGroup] = useState({
    group_name: '',
    group_id: '',
  });

  const listenFunc = (value, second_val) => {
    setGroup((each) => ({
      ...each,
      group_id: value,
      group_name: second_val
    }));
    setGroupDropdown(false)
  }

  const filterChange = (event, comp) => {
    if (comp === 'group_name') {
      dispatch(filterGroup(event.target.value));
    }
  }

  const submitFunc = () => {
    const sending_data = {};
    if (group.group_id === '') {
      setShowMessageBox(true);
      setShowMessageBoxMessage('Group Must Be Selected');
      return
    }
    else if(username.length < 5){
      setShowMessageBox(true);
      setShowMessageBoxMessage('Username Must Be Great Than 5 character');
      return
    }
    else if(card_number.length < 4){
      setShowMessageBox(true);
      setShowMessageBoxMessage('Card Number Must Be Greater than 4 character');
      return
    }
    sending_data.data = order_provide.order_provide_entering_data;
    sending_data.username = username;
    sending_data.card_number = card_number;
    sending_data.groupId = group.group_id;
    dispatch(StockService.provideStock(sending_data));
  }

  useEffect(() => {
    if (order_provide.order_provide_message_box) {
      setTimeout(() => {
        dispatch(setOrderProvideMessageBoxFalse())
      }, 2000);
    }
  }, [order_provide.order_provide_message_box]);

  useEffect(() => {
    if (show_message_box) {
      setTimeout(() => {
        setShowMessageBox(false);
      }, 2000)
    }
  }, [show_message_box])


  // When This Componennt is open, query will send to backend for taking all data from database

  return (
    <div className='flex flex-row justify-end z-20 fixed top-0 right-0 w-full h-full bg-black bg-opacity-30 '>

      {
        show_message_box && <MessageBox message={show_message_box_message} color={'bg-red-500'} />
      }

      {
        order_provide.order_provide_message_box &&
        <MessageBox message={order_provide.order_provide_error_message} color={order_provide.order_provide_color_cond} />
      }

      <div className='w-full h-full bg-white flex flex-col'>
        {/* Title and Close Section */}
        <div className='flex flex-row justify-end w-full ' >
          {/* Title Section */}
          <div className='flex flex-col justify-center p-4 w-full '>
            <span className="text-3xl text-center">
              Order Provide
            </span>
          </div>
          {/* Close Component Section */}
          <div className='flex justify-end p-5 text-end'>
            <span
              onClick={() => {
                dispatch(setOrderSelectionProvideToggleFalse());
              }}
              className='p-2 hover:bg-gray-100 hover:cursor-pointer rounded-lg'>
              <IoMdClose className='text-2xl' />
            </span>
          </div>

        </div>

        <div className="flex flex-row justify-between items-center">
          <div className="flex w-full my-2 ">
            {/* Name and Surname */}
            <div className="mx-3">
              <p>Name and Surname</p>
              <input onChange={(e) => setUsername(e.target.value)}
                type="text" className="border bg-gray-100 p-2  rounded-md outline-none" placeholder="Username" />
            </div>
            {/* Card Number */}
            <div className="mx-3">
              <p>Card Number</p>
              <input onChange={(e) => setCardNumber(e.target.value)}
                type="text" className="border bg-gray-100 p-2  rounded-md outline-none" placeholder="Card Number" />
            </div>

            {/* Group Name */}
            <div className="mx-3">
              <p>Group Name</p>
              {
                group_dropdown
                  ?
                  <DropDownComponent
                    data={filtered_groups}
                    text_name={'group_name'}
                    input_name={'Group Name'}
                    listenFunc={listenFunc}
                    filterChange={filterChange}
                  />
                  :
                  <button onClick={() => {
                    if (group_dropdown) {
                      setGroupDropdown(false)
                    }
                    else {
                      setGroupDropdown(true)
                    }
                  }}
                    className='text-sm bg-white border border-gray-300  rounded-lg  p-2 w-36 text-ellipsis overflow-hidden text-nowrap outline-none hover:border-orange-300 '
                  >
                    {group.group_id === '' ? 'Groups' : group.group_name}
                  </button>
              }
            </div>

          </div>
          <div>

            {/* Submit Button */}
            {
              !order_provide.order_provide_pending ?

                <button onClick={submitFunc}
                  className="bg-green-500 text-white px-5 py-3 rounded-lg duration-300 hover:bg-green-400">
                  Submit
                </button>
                : <CustomLoadingButton />
            }

          </div>
        </div>

        {/* Table Section */}
        <table className='w-full'>
          <OrderProvideTableHeaderComponent />
          {
            order_provide.order_provide_data.map((item, index) => (
              <OrderProvideTableRowComponent key={index + 1} index={index + 1} item={item} />
            ))
          }
        </table>

      </div>
    </div>
  )
}

export default OrderInformationComponent