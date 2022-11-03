import { Line } from "react-chartjs-2";
import Loader from "./Loader";

import React, { useState } from "react";
import { Col, Row, Typography } from "antd";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

const LineChart = ({ days, coinHistory, currentPrice, coinName, currency }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.length; i += 1) {
    coinPrice.push(coinHistory[i][1]);
    coinTimestamp.push(new Date(coinHistory[i][0]).toLocaleDateString());
  }

  // console.log(coinHistory)
  //   console.log(coinPrice);
  //   console.log(coinTimestamp);
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: `Price In ${currency.toUpperCase()}  Period(days): ${days}`,
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071BD",
        borderColor: "orange",
        pointBackgroundColor: "red",
        pointHoverBorderColor: "red",
        pointRadius: 2,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
      },
    },
  };

  /* const options={
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Chart.js Line Chart',
//       },
//     },
//   };
// const [data, setData]= useState({
//     labels:["Jan","Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"],
//     datasets:[
//       {
//         label:"First Dataset",
//         data:[10, 20, 30, 42, 51, 82, 31, 59, 61, 73, 91, 58],
//         backgroundColor:'yellow',
//         borderColor:'green',
//         tension:0.4,
//         fill:true,
//         pointStyle:'rect',
//         pointBorderColor:'blue',
//         pointBackgroundColor:'#fff',
//         showLine:true
//       }
//     ]
//   })
*/

  return (
    <>
      
      <div>
        <Row className="chart-header">
          <Typography.Title level={2} className="chart-title">
            {coinName} Price Chart{" "}
          </Typography.Title>
          <Col className="price-container">
            <Typography.Title level={5} className="current-price">
              Current {coinName} Price: $ {currentPrice}
            </Typography.Title>
          </Col>
        </Row>
        <Line data={data} options={options} />
      </div>
      
    </>
  );
};

export default LineChart;
