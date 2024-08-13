import React from 'react'
import { Pie, Doughnut } from "react-chartjs-2";

function DoughnutChart({ chartData }) {
  return (
    <div className="flex flex-col justify-around items-around w-full h-full ">
      <h2 className='text-center font-bold text-3xl'>Stock Analyz</h2>
      <Doughnut
        data={chartData}
        options={{
          plugins: {
            title: {
              display: false,
              text: "Users Gained between 2016-2020"
            }
          }
        }}
      />
    </div>
  )
}

export default DoughnutChart