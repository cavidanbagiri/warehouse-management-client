
import { TbSelect } from "react-icons/tb";
import {useSelector} from "react-redux";

function CreateTableNavbarHeaderComponent() {

  const user_status = useSelector(state => state.userSlice.user_status);
  const stock_column_filter = useSelector(state => state.stockSlice.stock_column_filter);

  return (
    <thead style={{ fontFamily: 'IBM Plex Sans' }} className="text-black bg-gray-100 border font-medium text-sm" >
          <tr>
            <th scope="col" className="px-2 py-3 text-center border">
              S/S
            </th>
            <th scope="col" className="flex items-center justify-center px-2 py-2 text-center border">
            <TbSelect />
            </th>

            { /* Date */
              stock_column_filter.date &&
            <th scope="col" className="px-6 py-1 text-center border font-medium ">
              <div className="">
                Date
              </div>
            </th>
            }

            { /* Company Name */
                stock_column_filter.company &&
            <th scope="col" className="px-6 py-1 text-center border font-medium min-w-40">
              <div className="">
                Company
              </div>
            </th>
            }
            { /* Document */
              stock_column_filter.document &&
                <th scope="col" className="px-6 py-1 text-center border font-medium ">
                  <div className="">
                    Document
                  </div>
                </th>
            }
            { /* Material name */
                stock_column_filter.material_name &&
                <th scope="col" className="px-6 py-1 text-center border  min-w-60 font-medium ">
                  <div className="">
                    Material Name
                  </div>
                </th>
            }
            { /* Type */
                stock_column_filter.type &&
                <th scope="col" className="px-6 py-1 text-center border font-medium ">
                  <div className="">
                    Type
                  </div>
                </th>
            }
            { /* Qty */
              stock_column_filter.qty &&
              <th scope="col" className="px-6 py-1 text-center border w-28 font-medium ">
                Qty
              </th>
            }
            { /* Qty */
                stock_column_filter.stock &&
                <th scope="col" className="px-6 py-1 text-center border w-28 font-medium ">
                  Stock
                </th>
            }
            { /* Unit */
                stock_column_filter.unit &&
                <th scope="col" className="px-6 py-1 text-center border w-28 font-medium ">
                  Unit
                </th>
            }
            {
              (user_status === '10000' || user_status === '10001' || user_status === '10002' )  &&
                <>
                  {
                    stock_column_filter.price &&
                    <th scope="col" className="px-6 py-1 text-center border w-28 font-medium ">
                      Price
                    </th>
                  }
                  { stock_column_filter.currency &&
                    <th scope="col" className="px-6 py-1 text-center border font-medium  w-28">
                      Currency
                    </th>
                  }
                </>
            }
            { /* Ordered */
                stock_column_filter.serial_number &&
                <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
                  Serial No
                </th>
            }
            { /* Ordered */
                stock_column_filter.material_id &&
                <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
                  Material ID
                </th>
            }
            { /* Ordered */
                stock_column_filter.ordered &&
                <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
                  Ordered
                </th>
            }
            { /* Ordered */
                stock_column_filter.group &&
                <th scope="col" className="px-6 py-1 text-center border font-medium ">
                  Group
                </th>
            }
            { /* PO */
                stock_column_filter.po &&
                <th scope="col" className="px-6 py-1 text-center border font-medium w-28">
                  PO
                </th>
            }


          </tr>
    </thead>
  )
}

export default CreateTableNavbarHeaderComponent