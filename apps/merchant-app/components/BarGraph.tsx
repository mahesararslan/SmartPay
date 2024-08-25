"use client";

import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

// Dynamically import the ApexCharts component with SSR disabled
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const BarGraph = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const series = [
    {
      name: "Income",
      color: "#31C48D",
      data: [1420, 1620, 1820, 1420, 1650, 2120],
    },
    {
      name: "Expense",
      data: [788, 810, 866, 788, 1100, 1200],
      color: "#F05252",
    }
  ];

  const options = {
    chart: {
      sparkline: {
        enabled: false,
      },
      type: "bar",
      toolbar: {
        show: false,
      }
    },
    fill: {
      opacity: 1,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "100%",
        borderRadiusApplication: "end",
        borderRadius: 6,
        dataLabels: {
          position: "top",
        },
      },
    },
    legend: {
      show: true,
      position: "bottom",
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (value: any) {
          return "$" + value;
        }
      }
    },
    xaxis: {
      labels: {
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
        },
        formatter: function(value: any) {
          return "$" + value;
        }
      },
      categories: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
        }
      }
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -20
      },
    },
  };

  return (
    <div className="chart-container">
      {/* Ensure that ApexCharts only renders on the client side */}
      {isClient && ( // @ts-ignore
        <ApexCharts options={options} series={series} type="bar" height={400} />
      )}
    </div>
  );
};

export default BarGraph;
