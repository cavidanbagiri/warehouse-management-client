import React, { useState } from 'react'

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { BarChart } from './charts/BarChart';


Chart.register(CategoryScale);

function GroupChartComponent() {

    const Data = [
        {
          id: 1,
          year: 'Warehouse',
          userGain: 80000,
          userLost: 823
        },
        {
          id: 2,
          year: 'Stock',
          userGain: 45677,
          userLost: 345
        },
        {
          id: 3,
          year: 'Area',
          userGain: 78888,
          userLost: 555
        },
        {
          id: 4,
          year: 'Unusable',
          userGain: 90000,
          userLost: 4555
        },
        {
          id: 5,
          year: 'Service',
          userGain: 4300,
          userLost: 234
        },
        {
            id: 5,
            year: 'Service',
            userGain: 4300,
            userLost: 234
          },
          {
            id: 5,
            year: 'Service',
            userGain: 4300,
            userLost: 234
          },
          {
            id: 5,
            year: 'Service',
            userGain: 4300,
            userLost: 234
          },
          {
            id: 5,
            year: 'Service',
            userGain: 4300,
            userLost: 234
          },
          {
            id: 5,
            year: 'Service',
            userGain: 4300,
            userLost: 234
          },
          {
            id: 5,
            year: 'Service',
            userGain: 4300,
            userLost: 234
          },
          {
            id: 5,
            year: 'Service',
            userGain: 4300,
            userLost: 234
          }
      ];
    
      const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.year), 
        datasets: [
          {
            data: Data.map((data) => data.userGain),
            backgroundColor: [
              "rgb(139 92 246)",
              "rgb(20,184,166)",
              "rgb(14,165,233)",
              "rgb(99,102,241)",
              "rgb(168,85,247)"
            ],
            borderColor: "black",
            borderWidth: 0
          }
        ]
      });
      

  return (
    <div className='col-span-7 ml-8 h-[600px] bg-white rounded-xl my-5'>
        
        <BarChart chartData={chartData} />

    </div>
  )
}

export default GroupChartComponent