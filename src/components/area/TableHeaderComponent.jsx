
import { TbSelect } from "react-icons/tb";
import { useSelector } from "react-redux";

function CreateTableNavbarHeaderComponent() {

  const user_status = useSelector(state => state.userSlice.user_status);
  const area_column_filter = useSelector(state => state.areaSlice.area_column_filter);

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
          area_column_filter.deliver_date &&
          <th scope="col" className="px-6 py-1 text-center border font-medium ">
            <div className="">
              Date
            </div>
          </th>
        }

        { /* Material Name */
          area_column_filter.material_name &&
          <th scope="col" className="px-6 py-1 text-center border min-w-60 font-medium">
            <div className="">
              Material Name
            </div>
          </th>
        }

        { /* Type */
          area_column_filter.type &&
          <th scope="col" className="px-6 py-1 text-center border font-medium ">
            <div className="">
              Type
            </div>
          </th>
        }


        { /* Amount */
          area_column_filter.qty &&
          <th scope="col" className="px-6 py-1 text-center border font-medium ">
            <div className="">
              Amount
            </div>
          </th>
        }
        { /* Unit */
          area_column_filter.unit &&
          <th scope="col" className="px-6 py-1 text-center border  font-medium ">
            <div className="">
              Unit
            </div>
          </th>
        }

        { /* Serial Number */
          area_column_filter.serial_number &&
          <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
            Serial No
          </th>
        }

        { /* Material ID */
          area_column_filter.material_id &&
          <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
            Material ID
          </th>
        }

        { /* Card Number */
          area_column_filter.card_number &&
          <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
            Card Number
          </th>
        }

        { /* Username */
          area_column_filter.username &&
          <th scope="col" className="px-6 py-1 text-center border font-medium min-w-32">
            Username
          </th>
        }

        { /* Group name */
          area_column_filter.group_name &&
          <th scope="col" className="px-6 py-1 text-center border min-w-40 font-medium ">
            Group Name
          </th>
        }

        { /* Group name */
          area_column_filter.provideType &&
          <th scope="col" className="px-6 py-1 text-center border min-w-40 font-medium ">
            Provide Type
          </th>
        }

        { /* Group name */
          area_column_filter.po &&
          <th scope="col" className="px-6 py-1 text-center border min-w-40 font-medium ">
            PO
          </th>
        }

      </tr>
    </thead>
  )
}

export default CreateTableNavbarHeaderComponent