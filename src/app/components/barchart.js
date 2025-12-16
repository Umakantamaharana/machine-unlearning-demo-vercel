import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Margarine } from 'next/font/google';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, options }) => {
    // Fallback if no data provided (e.g., during dev) to prevent crash
    const defaultData = {
        labels: [],
        datasets: []
    };

    const defaultOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Chart' },
        }
    };

    return <Bar data={data || defaultData} options={options || defaultOptions} height={200} />;
};

export default BarChart;
