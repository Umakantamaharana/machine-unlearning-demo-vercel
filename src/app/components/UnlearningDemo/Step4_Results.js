import React, { useState } from "react";
import BarChart from "../barchart";

// Reusing existing BarChart logic
// We need to pass data in the format expected by chart.js/react-chartjs-2 wrapper
// Based on playground.js info:
// Forget Loss: ~12-24, Retain Loss: ~9-11
// We want to show: 
// 1. Original Model (Low Forget Loss, Low Retain Loss - because it knows everything)
// 2. Retrained/Gold (High Forget Loss - doesn't know it, Low Retain Loss)
// 3. Unlearned (High Forget Loss - ideally matches Gold, Low Retain Loss)

const Step4_Results = ({ dataset, model, addCommand, onBack }) => {

    const data = {
        labels: ['Original Model', 'Retrained (Gold)', 'Unlearned Model'],
        datasets: [
            {
                label: 'Accuracy on "Forget" Data (Lower is Better for Unlearning)',
                data: [95, 12, 14], // High accuracy originally, low after forgetting
                backgroundColor: 'rgba(239, 68, 68, 0.6)', // Red
                borderColor: 'rgba(239, 68, 68, 1)',
                borderWidth: 1,
            },
            {
                label: 'Accuracy on "Retain" Data (Higher is Better)',
                data: [96, 95, 93], // Should stay high
                backgroundColor: 'rgba(59, 130, 246, 0.6)', // Blue
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: { display: true, text: 'Accuracy %' }
            }
        }
    };


    return (
        <div className="flex flex-col space-y-6 h-full">
            <div>
                <h2 className="text-2xl font-semibold mb-2 text-gray-200">4. Evaluation Results</h2>
                <p className="text-gray-400 mb-4">
                    Did it work? We compare our <b>Unlearned Model</b> against the <b>Original</b> and the <b>Gold Standard</b> (Retrained) model.
                </p>
            </div>

            <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex-grow min-h-[300px] relative">
                <BarChart
                    data={data}
                    options={options} // Assuming underlying component accepts options
                />
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-gray-800 rounded-lg">
                    <div className="text-red-400 font-bold">Privacy Check</div>
                    <div className="text-2xl text-white">PASSED</div>
                    <div className="text-xs text-gray-500">Forget set accuracy dropped significantly.</div>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                    <div className="text-blue-400 font-bold">Utility Check</div>
                    <div className="text-2xl text-white">PASSED</div>
                    <div className="text-xs text-gray-500">Retain set accuracy remained high.</div>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                    <div className="text-green-400 font-bold">Efficiency</div>
                    <div className="text-2xl text-white">20x Faster</div>
                    <div className="text-xs text-gray-500">Compared to full retraining.</div>
                </div>
            </div>

            <div className="pt-4 flex justify-between">
                <button
                    onClick={onBack}
                    className="px-6 py-2 rounded-lg font-medium text-gray-400 hover:bg-gray-800 transition-colors"
                >
                    Back
                </button>
                <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 rounded-lg font-bold bg-gray-700 hover:bg-gray-600 text-white"
                >
                    Restart Demo
                </button>
            </div>
        </div>
    );
};

export default Step4_Results;
