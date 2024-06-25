import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const data = {
        labels: ['Original Model', 'Gold Model', 'Unlearned Model'],
        datasets: [
            {
                label: 'Retain Loss',
                data: [9.33, 11.38, 9.97],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                // borderColor: 'rgba(54, 162, 235, 1)',
                borderColor: 'green',
                borderWidth: 1,
            },
            {
                label: 'Forget Loss',
                data: [12.76, 24.30, 21.63],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                // borderColor: 'rgba(255, 99, 132, 1)',
                borderColor: 'green',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Loss Comparison',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={data} options={options} height={300}/>;
};

export default BarChart;
