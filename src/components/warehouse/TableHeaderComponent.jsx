
import { TbSelect } from "react-icons/tb";
import {useSelector} from "react-redux";

function CreateTableNavbarHeaderComponent() {

  const user_status = useSelector(state => state.userSlice.user_status);
  const warehouse_column_filter = useSelector(state => state.warehouseSlice.warehouse_column_filter);

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
              warehouse_column_filter.date &&
            <th scope="col" className="px-6 py-1 text-center border font-medium ">
              <div className="">
                Date
              </div>
            </th>
            }

            { /* Company Name */
                warehouse_column_filter.company &&
            <th scope="col" className="px-6 py-1 text-center border font-medium min-w-40">
              <div className="">
                Company
              </div>
            </th>
            }
            { /* Document */
              warehouse_column_filter.document &&
                <th scope="col" className="px-6 py-1 text-center border font-medium ">
                  <div className="">
                    Document
                  </div>
                </th>
            }
            { /* Material name */
                warehouse_column_filter.material_name &&
                <th scope="col" className="px-6 py-1 text-center border  min-w-60 font-medium ">
                  <div className="">
                    Material Name
                  </div>
                </th>
            }
            { /* Type */
                warehouse_column_filter.type &&
                <th scope="col" className="px-6 py-1 text-center border font-medium ">
                  <div className="">
                    Type
                  </div>
                </th>
            }
            { /* Qty */
              warehouse_column_filter.qty &&
              <th scope="col" className="px-6 py-1 text-center border w-28 font-medium ">
                Qty
              </th>
            }
            { /* Qty */
                warehouse_column_filter.leftover &&
                <th scope="col" className="px-6 py-1 text-center border w-28 font-medium ">
                  Leftover
                </th>
            }
            { /* Unit */
                warehouse_column_filter.unit &&
                <th scope="col" className="px-6 py-1 text-center border w-28 font-medium ">
                  Unit
                </th>
            }
            {
              (user_status === '10000' || user_status === '10001' || user_status === '10002' )  &&
                <>
                  {
                    warehouse_column_filter.price &&
                    <th scope="col" className="px-6 py-1 text-center border w-28 font-medium ">
                      Price
                    </th>
                  }
                  { warehouse_column_filter.currency &&
                    <th scope="col" className="px-6 py-1 text-center border font-medium  w-28">
                      Currency
                    </th>
                  }
                </>
            }
            { /* Ordered */
                warehouse_column_filter.ordered &&
                <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
                  Ordered
                </th>
            }
            { /* PO */
                warehouse_column_filter.po &&
                <th scope="col" className="px-6 py-1 text-center border font-medium w-28">
                  PO
                </th>
            }

            { /* Certificate */
                warehouse_column_filter.certificate &&
                <th scope="col" className="px-6 py-1 text-center border font-medium w-28">
                  Certificate
                </th>
            }

            { /* Passport */
                warehouse_column_filter.certificate &&
                <th scope="col" className="px-6 py-1 text-center border font-medium w-28">
                  Passport
                </th>
            }

          </tr>
    </thead>
  )
}

export default CreateTableNavbarHeaderComponent