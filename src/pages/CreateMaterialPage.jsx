
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { addTableCheck, delRow, setShowMessageFalse } from '../store/create_table-store';
import { setShowErrorTrue, setShowErrorFalse } from '../store/message_box-store';


import CreateTableService from '../services/create_table-service';
import CommonService from '../services/common.services';

import TableHeaderComponent from '../components/creatematerial/TableHeaderComponent'
import TableBodyComponent from '../components/creatematerial/TableBodyComponent'
import DropDownComponent from '../components/common/DropdownComponent';
import MessageBox from '../layouts/MessageBox.jsx';
import AdminModal from '../layouts/AdminModal';

import LoadingButton from '@mui/lab/LoadingButton';

import { CURRENCIES, USER_MESSAGES } from '../constants/values';

import { LuRefreshCw } from "react-icons/lu";

function CreateMaterialPage() {

  const dispatch = useDispatch();

  // const user_status = useSelector((state) => state.userSlice.user_status);
  const user = useSelector((state) => state.userSlice.user);

  const companies = useSelector((state) => state.commonSlice.companies);
  const ordereds = useSelector((state) => state.commonSlice.ordereds);
  const table = useSelector((state) => state.createTableSlice.table);
  const show_message_box = useSelector((state) => state.messageBoxSlice.toggle_message);
  const show_load = useSelector((state) => state.createTableSlice.show_load);
  const show_message = useSelector((state) => state.createTableSlice.show_message);
  const show_message_text = useSelector((state) => state.createTableSlice.show_message_text);
  const show_message_color = useSelector((state) => state.createTableSlice.show_message_color);
  const type_data = useSelector((state) => state.createTableSlice.type_data);

  const [total_price, setTotalPrice] = useState(0.00);
  const [add_company, setAddCompany] = useState(false);
  const [add_ordered, setAddOrdered] = useState(false);
  const [add_group, setAddGroup] = useState(false);
  const [add_material_code, setAddMaterialCode] = useState(false);
  const [message, setMessage] = useState('');
  const [isCompanyDropDown, setIsCompanyDropDown] = useState(false);
  const [isUserDropDown, setIsUserDropDown] = useState(false);
  const [company_refresh_message, setCompanyRefreshMessage] = useState(false);
  const [ordered_refresh_message, setOrderedRefreshMessage] = useState(false);
  const [doc_num, setDocNum] = useState('');
  const [currency, setCurrency] = useState('rub');



  const [company, setCompany] = useState({
    companyId: '',
    company_name: ''
  })
  const [ordered, setOrdered] = useState({
    orderedId: '',
    ordered_name: '',
  })

  function addCompany() {
    if (user.is_admin || user.status_code === 1000 || user.status_code === 10000 || user.status_code === 10001 )
      setAddCompany(true);
    else {
      setMessage(USER_MESSAGES.AUTHORIZATION_ERROR);
      dispatch(setShowErrorTrue());
      setTimeout(() => {
        dispatch(setShowErrorFalse());
      }, 2000)
    }
  }
  function addOrdered() {
    if (user.is_admin || user.status_code === 1000 || user.status_code === 10000 || user.status_code === 10001 )
      setAddOrdered(true);
    else {
      setMessage(USER_MESSAGES.AUTHORIZATION_ERROR);
      dispatch(setShowErrorTrue());
      setTimeout(() => {
        dispatch(setShowErrorFalse());
      }, 2000)
    }
  }
  function addGroup() {
    if (user.is_admin || user.status_code === 1000 || user.status_code === 10000 || user.status_code === 10001 )
      setAddGroup(true);
    else {
      setMessage(USER_MESSAGES.AUTHORIZATION_ERROR);
      dispatch(setShowErrorTrue());
      setTimeout(() => {
        dispatch(setShowErrorFalse());
      }, 2000)
    }
  }
  function addMaterialCode() {
    if (user.is_admin || user.status_code === 1000 || user.status_code === 10000 || user.status_code === 10001 )
      setAddMaterialCode(true);
    else {
      setMessage(USER_MESSAGES.AUTHORIZATION_ERROR);
      dispatch(setShowErrorTrue());
      setTimeout(() => {
        dispatch(setShowErrorFalse());
      }, 2000)
    }
  }

  function addRows() { dispatch(addTableCheck()); }
  function delRows() {
    if (table.length > 1) {
      dispatch(delRow());
    }
    else {
      setMessage('En az bir satir olmalidir');
      dispatch(setShowErrorTrue());
      setTimeout(() => {
        dispatch(setShowErrorFalse());
      }, 2000)
    }
  }

  function closeModal() {
    if (add_company === true) { setAddCompany(false) }
    if (add_ordered === true) { setAddOrdered(false) }
    if (add_group === true) { setAddGroup(false) }
    if (add_material_code === true) { setAddMaterialCode(false) }
  }

  function postFunc() {
    if (user.is_admin || user.status_code === 1000 || user.status_code === 10000 || user.status_code === 10001 ) {
      let cond = true;
      if (company.company_name === '') {
        setMessage(`Firma ismi secilmesi zorunludur`);
        cond = false;
      }
      else if (ordered.ordered_name === '') {
        setMessage(`Siparisci ismi secilmesi zorunludur`);
        cond = false;
      }
      if (table.length === 0) {
        setMessage('Setir sayisi bos olamaz');
        cond = false;
      }
      else {
        for (let i of table) {
          if (i.material_name === "") {
            setMessage(`In ${i.ss} Setir, Malzeme ismi girilmesi zorunludur`);
            cond = false;
            break;
          }
          else if (i.qty <= 0) {
            setMessage(`In ${i.ss} Setir, Malzeme miktari 0 veya negatif olamaz`);
            cond = false;
            break;
          }
          else if (i.material_code_id === '') {
            setMessage(`In ${i.ss} Setir, Malzeme kodu secilmesi zorunludur`);
            cond = false;
            break;
          }
        }
      }
      if (cond) {
        const default_data = { companyId: company.companyId, orderedId: ordered.orderedId, document: doc_num, currency: currency };
        let common_data = {
          default_data: default_data,
          table_data: table
        }
        dispatch(CreateTableService.receiveWarehouse(common_data));

      }
      else {
        dispatch(setShowErrorTrue());
        setTimeout(() => {
          dispatch(setShowErrorFalse());
        }, 2000)
      }

    }
    else {
      setMessage(USER_MESSAGES.AUTHORIZATION_ERROR);
      dispatch(setShowErrorTrue());
      setTimeout(() => {
        dispatch(setShowErrorFalse());
      }, 2000)
    }


  }
  const listenCompany = (val, second_val) => {
    setCompany((each) => ({
      ...each,
      companyId: val,
      company_name: second_val
    }));
    setIsCompanyDropDown(!isCompanyDropDown)
  }
  const listenUser = (val, second_val) => {
    setOrdered((each) => ({
      ...each,
      orderedId: val,
      ordered_name: second_val
    }))
    setIsUserDropDown(!isUserDropDown);
  }
  const filterChange = (event, comp) => {
    if (comp === 'username') {
      dispatch(CommonService.filterOrdereds(event.target.value));
    }
    else if (comp === 'company_name') {
      dispatch(CommonService.filterCompanies(event.target.value));
    }
  }
  const refreshCompany = () => {
    dispatch(CommonService.fetchCompanies());
    setCompanyRefreshMessage(true);
  }
  const refreshOrdereds = () => {
    dispatch(CommonService.fetchOrdereds());
    setOrderedRefreshMessage(true)
  }

  function handleEscape(e) {
    if (e.key === 'Escape') {
      setIsCompanyDropDown(false);
      setIsUserDropDown(false)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch(setShowMessageFalse());
    }, 2000)
  }, [show_message])

  useEffect(() => {
    let price = 0;
    for (let i of table) {
      price += Number(i.price) * Number(i.qty);
    }
    setTotalPrice(price);
  },);

  useEffect(() => {
    if (company_refresh_message) {
      setTimeout(() => {
        setCompanyRefreshMessage(false);
      }, 1500,)
    }
    if (ordered_refresh_message) {
      setTimeout(() => {
        setOrderedRefreshMessage(false);
      }, 1500)
    }
  }, [company_refresh_message, ordered_refresh_message])

  useEffect(() => { document.addEventListener('keydown', handleEscape, true); }, [])

  return (

    <div style={{ fontFamily: 'IBM Plex Sans' }} className='flex flex-col '>

      {
        show_message_box && <MessageBox message={message} color={'bg-red-500'} />
      }

      {
        show_message && <MessageBox message={show_message_text} color={show_message_color} />
      }


      { // Checked
        add_company && <AdminModal title={'Firma Ekle'} closeModal={closeModal} show_component={'company'} />
      }

      { // Checked
        add_ordered && <AdminModal title={'Siparisci Ekle'} closeModal={closeModal} show_component={'ordered'} />
      }

      { // Checked
        add_group && <AdminModal title={'Grup Ekle'} closeModal={closeModal} show_component={'group'} />
      }

      { // Checked
        add_material_code && <AdminModal title={'Malzeme Kodu Ekle'} closeModal={closeModal} show_component={'material_code'} />
      }

      {
        company_refresh_message && <MessageBox message={'Firmalar Yenilendi'} color={'bg-green-500'} />
      }

      {
        ordered_refresh_message && <MessageBox message={'Siparisciler Yenilendi'} color={'bg-green-500'} />
      }


      <div style={{ fontFamily: 'IBM Plex Sans' }} className='flex flex-col justify-between'>

        {/* Table page informa */}
        <div className='flex flex-row justify-between items-center bg-gray-100 rounded-lg px-4 mt-4 mb-3'>
          <span style={{ fontWeight: 600 }} className='py-4 px-2 rounded-lg text-5xl text-start '>Malzeme Giris Sayfasi</span>
          <div className='text-xs' style={{ fontWeight: 500 }}>
            {
              !show_load ?
                <button onClick={postFunc} className='text-base py-3 px-5 border rounded-md border-green-500 bg-green-600 text-white mx-2 hover:bg-white hover:text-green-500 duration-200' >Ambara Teslim Al</button>
                :
                <LoadingButton loading variant="outlined" className='text-black'>
                  Waiting
                </LoadingButton>
            }
          </div>
        </div>

        {/* Button Information */}
        <div className='flex flex-row justify-between items-center px-4'>
          <span style={{ fontWeight: 700 }} className='py-2 px-1 rounded-lg text-[32px] text-start my-2'>Tablo Kontrol</span>
          <div className='text-xs' style={{ fontWeight: 500 }}>

            <button onClick={addCompany} className='text-[13px] py-2 px-4 border rounded-md border-gray-400 mx-2 hover:bg-orange-400 hover:text-white duration-200' >Yeni Firma Ekle</button>
            <button onClick={addOrdered} className='text-[13px] py-2 px-4 border rounded-md border-gray-400 mx-2 hover:bg-orange-400 hover:text-white duration-200' >Yeni Siparisci Ekle</button>
            <button onClick={addGroup} className='text-[13px] py-2 px-4 border rounded-md border-gray-400 mx-2 hover:bg-orange-400 hover:text-white duration-200' >Yeni Group Ekle</button>
            <button onClick={addMaterialCode} className='text-[13px] py-2 px-4 border rounded-md border-gray-400 mx-2 hover:bg-orange-400 hover:text-white duration-200' >Malzeme Kodu Ekle</button>

            <button onClick={addRows} className='text-[13px] py-2 px-4 border rounded-md border-gray-400 mx-2 hover:bg-orange-400 hover:text-white duration-200' >Satir Ilave Et</button>
            <button onClick={delRows} className='text-[13px] py-2 px-4 border rounded-md border-gray-400 mx-2 hover:bg-orange-400 hover:text-white duration-200' >Satir Sil</button>

            {/* <button onClick={postFunc} className='py-2 px-5 border rounded-md border-gray-400 bg-white text-green-500 mx-2 hover:bg-green-500 hover:text-white duration-200' >Insert From Excel </button> */}
          </div>
        </div>

        {/* Material Type Inform */}
        <div className='flex justify-between items-center my-3'>

          <div className='flex flex-col justify-start px-5 '>

            <div className='flex text-lg text-gray-400 items-center'>
              <span className='w-28 text-[17px] py-0.5'>
                Proje
              </span>
              <span className='bg-gray-200 h-2 rounded-lg w-36'>
              </span>
              <span style={{ fontWeight: 600 }} className='text-green-500 text-[16px] ml-4'>
                {type_data.Project}
              </span>
            </div>
            <div className='flex text-lg text-gray-400 items-center'>
              <span className='w-28 text-[17px] py-0.5'>
                Demirbas
              </span>
              <span className='bg-gray-200 h-2 rounded-lg w-36'>
              </span>
              <span style={{ fontWeight: 600 }} className='text-green-500 text-[16px] ml-4'>
                {type_data.Fixture}
              </span>
            </div>
            <div className='flex text-lg text-gray-400 items-center'>
              <span className='w-28 text-[17px] py-0.5'>
                Sarf
              </span>
              <span className='bg-gray-200 h-2 rounded-lg w-36'>
              </span>
              <span style={{ fontWeight: 600 }} className='text-green-500 text-[16px] ml-4'>
                {type_data.Consumable}
              </span>
            </div>

          </div>

          <div className='flex flex-col items-end'>
            <div className='px-4 text-sm flex items-center'>
              <span style={{ fontWeight: 500 }} className='text-xs text-gray-400'>Para Birimi</span>
              <select
                className=' mx-2 text-xs border-2 border-orange-400 text-orange-400 font-bold outline-none rounded-md'
                defaultValue={'rub'} name="" id="" onChange={(e) => {
                  setCurrency(e.target.value);
                }}>

                {
                  CURRENCIES.map((each, index) => (
                    <option key={index} value={each}>{each}</option>
                  ))
                }

              </select>
            </div>
          </div>

        </div>

        {/* Table Information */}
        <div className='flex flex-row justify-between items-center mt-3 mb-5 px-5'>

          <div className='flex justify-start text-lg'>
            <div className='' >
              <p className='text-gray-400 text-md'>
                Toplam Satir:
              </p>
              <span className='font-bold text-2xl'>
                {table.length}
              </span>
            </div>
            <div className='pl-40' >
              <p className='text-gray-400 text-md'>
                Cari Girilen Fiyat:
              </p>
              <span className='font-bold text-2xl'>
                {total_price.toFixed(2)} ₽
              </span>
            </div>
            <div className='pl-40' >
              <p className='text-gray-400 text-md'>
                Toplam Girilen Fiyat:
              </p>
              <span className='font-bold text-2xl'>
                {total_price.toFixed(2)} ₽
              </span>
            </div>
          </div>
        </div>

        {/* Default Table Information */}
        <div className='flex items-center justify-between mb-3 px-5'>

          {/* Doc, Company, Ordered Dropdown */}
          <div className='flex items-center'>

            {/* Doc Number Side */}
            <div className='mr-6'>
              <p className='text-sm text-gray-400 pl-1'>Dokuman Numarasi</p>
              <input className=' text-xs bg-white border border-gray-300 rounded-lg w-36 p-2 outline-none text-center' type="text" placeholder='Dokuman Numarasi' onChange={(e) => {
                setDocNum(e.target.value);
              }} />
            </div>

            {/* Company Side */}
            <div className='relative mr-6'>
              <p className='text-sm text-gray-400 pl-1'>Firma</p>
              <button className='text-xs bg-white border border-gray-300  rounded-lg  p-2 w-48 text-ellipsis overflow-hidden text-nowrap outline-none' onClick={() => {
                setIsCompanyDropDown(!isCompanyDropDown)
              }}>
                {company.companyId === '' ? 'Firma Sec' : company.company_name}
              </button>
              {
                isCompanyDropDown && <DropDownComponent
                  data={companies}
                  text_name={'company_name'}
                  input_name={'Firma Ismi'}
                  listenFunc={listenCompany}
                  filterChange={filterChange}
                />
              }
            </div>

            {/* Ordered Side */}
            <div className='relative'>
              <p className='text-sm text-gray-400 pl-1'>Siparisci</p>
              <button className='text-xs bg-white border border-gray-300 rounded-lg p-2 w-48 text-ellipsis overflow-hidden text-nowrap outline-none hover:border-orange-300 ' onClick={() => {
                setIsUserDropDown(!isUserDropDown)
              }}>
                {ordered.orderedId === '' ? 'Siparisci Sec' : ordered.ordered_name}
              </button>
              {
                isUserDropDown && <DropDownComponent
                  data={ordereds}
                  text_name={'username'}
                  input_name={'Siparisci Ismi'}
                  listenFunc={listenUser}
                  filterChange={filterChange}
                />
              }
            </div>

          </div>

          {/* Ordered Dropdown */}
          <div className='flex '>

            <div className='flex px-2 mt-3 items-center hover:cursor-pointer' onClick={refreshCompany}>
              <LuRefreshCw className='text-green-500' />
              <span className='text-sm text-gray-700 ml-2 font-bold' >Firma Yenile</span>
            </div>

            <div className='flex px-2 mt-3 items-center hover:cursor-pointer' onClick={refreshOrdereds}>
              <LuRefreshCw className='text-green-500' />
              <span className='text-sm text-gray-700 ml-2 font-bold' >Siparisci Yenile</span>
            </div>

          </div>

        </div>


      </div>

      <table>
        <TableHeaderComponent />
        <TableBodyComponent />
      </table>

    </div>
  )
}

export default CreateMaterialPage

{/* {
              !show_load ?
                <button onClick={postFunc} className='text-sm py-2 px-5 border rounded-md border-green-500 bg-green-500 text-white mx-2 hover:bg-white hover:text-green-500 duration-200' >Receive Warehouse</button>
                :
                <LoadingButton loading variant="outlined" className='text-black'>
                  Please Submit
                </LoadingButton>
            } */}