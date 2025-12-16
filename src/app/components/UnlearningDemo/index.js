"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Terminal from "../terminal";
import Step1_Setup from "./Step1_Setup";
import Step2_Selection from "./Step2_Selection";
import Step3_Process from "./Step3_Process";
import Step4_Results from "./Step4_Results";

// Central State Management for the Demo
const UnlearningDemo = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [commands, setCommands] = useState([]);

    // Demo State
    const [dataset, setDataset] = useState(null);
    const [model, setModel] = useState(null);
    const [forgetData, setForgetData] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Helper to add terminal commands
    const addCommand = (cmd) => {
        setCommands((prev) => [...prev, cmd]);
    };

    const nextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, 4));
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    // Render the current step component
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Step1_Setup
                        dataset={dataset}
                        setDataset={setDataset}
                        model={model}
                        setModel={setModel}
                        addCommand={addCommand}
                        onNext={nextStep}
                    />
                );
            case 2:
                return (
                    <Step2_Selection
                        dataset={dataset}
                        forgetData={forgetData}
                        setForgetData={setForgetData}
                        addCommand={addCommand}
                        onNext={nextStep}
                        onBack={prevStep}
                    />
                );
            case 3:
                return (
                    <Step3_Process
                        dataset={dataset}
                        model={model}
                        forgetData={forgetData}
                        addCommand={addCommand}
                        onNext={nextStep}
                        onBack={prevStep}
                    />
                );
            case 4:
                return (
                    <Step4_Results
                        dataset={dataset}
                        model={model}
                        addCommand={addCommand}
                        onBack={prevStep}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen w-full bg-gray-900 text-white overflow-hidden">
            {/* LEFT: Interactive Visual Guide (60%) */}
            <div className="w-3/5 h-full p-8 flex flex-col relative z-10 overflow-y-auto custom-scrollbar">

                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-700 rounded-full mb-8">
                    <motion.div
                        className="h-full bg-blue-500 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: `${(currentStep / 4) * 100}%` }}
                    />
                </div>

                <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                    Machine Unlearning Demo
                </h1>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex-grow"
                    >
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>

            </div>

            {/* RIGHT: Reactive Terminal (Sidecar) (40%) */}
            <div className="w-2/5 h-full border-l border-gray-700 bg-gray-950 p-4 flex flex-col shadow-2xl">
                <h2 className="text-sm font-mono text-gray-400 mb-2 px-2 border-b border-gray-800 pb-2">
                    Terminal Output
                </h2>
                <div className="flex-grow overflow-hidden rounded-lg bg-black/50 border border-gray-800">
                    <Terminal commands={commands} />
                </div>
            </div>
        </div>
    );
};

export default UnlearningDemo;
