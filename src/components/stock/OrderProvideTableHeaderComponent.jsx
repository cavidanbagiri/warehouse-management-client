
import { useSelector } from "react-redux";

function OrderProvideTableHeaderComponent() {

    return (
        <thead style={{ fontFamily: 'IBM Plex Sans' }} className="text-black bg-gray-100 border font-medium text-sm" >
            <tr>
                <th scope="col" className="px-2 py-3 text-center border">
                    S/S
                </th>

                { /* Material name */
                    <th scope="col" className="px-6 py-1 text-center border  min-w-60 font-medium ">
                        <div className="">
                            Material Name
                        </div>
                    </th>
                }
                { /* Type */
                    <th scope="col" className="px-6 py-1 text-center border font-medium ">
                        <div className="">
                            Type
                        </div>
                    </th>
                }

                { /* Stock */
                    <th scope="col" className="px-6 py-1 text-center border w-28 font-medium ">
                        Stock
                    </th>
                }
                { /* Unit */
                    <th scope="col" className="px-6 py-1 text-center border w-28 font-medium ">
                        Unit
                    </th>
                }
                { /* Serial No */
                    <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
                        Serial No
                    </th>
                }
                { /* Material ID */
                    <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
                        Material ID
                    </th>
                }

                { /* Amount */
                    <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
                        Amount
                    </th>
                }
                { /* Serial No */
                    <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
                        Set Serial Number
                    </th>
                }
                { /* Material ID */
                    <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
                        Set Material Id
                    </th>
                }

            </tr>
        </thead>
    )
}

export default OrderProvideTableHeaderComponent