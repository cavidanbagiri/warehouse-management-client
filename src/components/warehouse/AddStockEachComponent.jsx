import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {updatefetchSelectedItems} from "../../store/warehouse-store.js";



function AddStockEachComponent(props) {

    const dispatch = useDispatch();

    const [amount, setAmount] = useState(-1);
    const [serial_number, setSerialNumber] = useState('');
    const [material_id, setMaterialId] = useState('');

    useEffect(()=>{
        if(amount < 0){
            setAmount(props.item.leftover)
        }
        else{
            let data = {
                id: props.item.id,
                qty: props.item.leftover,
                entered_amount: amount,
                serial_number: serial_number,
                material_id: material_id,
            }
            dispatch(updatefetchSelectedItems(data))
        }
    },)

    return (

        <div className='flex flex-col border p-2 my-2'>
            <div className='flex mt-2'>
                <span className='w-1/3'>Document Number </span>
                <div className='relative w-full'>
                    <span>{props.item.document}</span>
                </div>
            </div>
            <div className='flex mt-2'>
                <span className='w-1/3'>Material Name </span>
                <div className='relative w-full'>
                    <span>{props.item.material_name}</span>
                </div>
            </div>
            <div className='flex mt-2'>
                <span className='w-1/3'>Quantity </span>
                <div className='relative w-full font-bold'>
                    <span>{props.item.qty}</span>
                </div>
            </div>
            <div className='flex mt-2'>
                <span className='w-1/3'>Leftover </span>
                <div className='relative w-full font-bold'>
                    <span>{props.item.leftover}</span>
                </div>
            </div>
            <div className='flex mt-2'>
                <span className='w-1/3'>Stock Amount </span>
                <div className='relative w-full'>
                    <input className='border p-2 rounded-lg'
                           type="number" value={amount} placeholder="Stock Amount" onChange={(e) => {
                        if (e.target.value > props.item.leftover || e.target.value < 0) {
                            console.log('cant entered amount ');
                        } else {
                            setAmount(e.target.value);
                        }
                    }}/>
                </div>
            </div>
            <div className='flex mt-2'>
                <span className='w-1/3'>Serial Number</span>
                <div className='relative w-full'>
                    <input className='border p-2 rounded-lg'
                           type="text" value={serial_number} placeholder="Serial Number" onChange={(e) => {
                        setSerialNumber(e.target.value)
                    }}/>
                </div>
            </div>
            <div className='flex mt-2'>
                <span className='w-1/3'>Material ID</span>
                <div className='relative w-full'>
                    <input className='border p-2 rounded-lg'
                           type="text" value={material_id} placeholder="Material ID" onChange={(e) => {
                        setMaterialId(e.target.value)
                    }}/>
                </div>
            </div>
        </div>

    )
}

export default AddStockEachComponent