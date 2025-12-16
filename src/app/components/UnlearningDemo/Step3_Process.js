import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Step3_Process = ({ dataset, model, forgetData, addCommand, onNext, onBack }) => {
    const [progress, setProgress] = useState({
        retraining: 0,
        unlearning: 0
    });
    const [status, setStatus] = useState("idle"); // idle, running, completed

    const startSimulation = () => {
        setStatus("running");
        addCommand(`> optimizer = torch.optim.SGD(model.parameters(), lr=0.01, momentum=0.9)`);
        addCommand(`> criterion = nn.CrossEntropyLoss()`);

        // Simulate Retraining (Slow)
        let r = 0;
        const retrainInterval = setInterval(() => {
            r += Math.random() * 2; // Slow increment
            if (r >= 100) {
                r = 100;
                clearInterval(retrainInterval);
            }
            setProgress(p => ({ ...p, retraining: r }));
        }, 100);

        // Simulate Unlearning (Fast)
        let u = 0;
        setTimeout(() => { // Start slightly delayed for effect
            addCommand(`> # Applying SISA (Sharded, Isolated, Sliced, Aggregated) Unlearning`);
            addCommand(`> shard_optimizer.step()  # Updating only relevant shards`);
            const unlearnInterval = setInterval(() => {
                u += Math.random() * 8; // Fast increment
                if (u >= 100) {
                    u = 100;
                    clearInterval(unlearnInterval);
                    setStatus("completed");
                    addCommand(`> torch.save(unlearned_model.state_dict(), 'unlearned_model.pth')`);
                    addCommand(`> Process Complete: Unlearning finished in 0.42s (vs Retraining 18.5s)`);
                }
                setProgress(p => ({ ...p, unlearning: u }));
            }, 50);
        }, 500);

        return () => {
            clearInterval(retrainInterval);
        };
    };

    return (
        <div className="flex flex-col space-y-8">
            <div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-200">3. The Unlearning Process</h2>
                <p className="text-gray-400 mb-6">
                    How do we remove the data? <br />
                    <b>Option A: Full Retraining</b> - Train a new model from scratch on (Dataset - Forget Data). Safe but extremely slow.<br />
                    <b>Option B: Machine Unlearning</b> - Use advanced algorithms (like SISA or Gradient Ascent) to surgicaly remove data. Fast and efficient.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
                {/* Retraining Simulation */}
                <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                    <h3 className="text-xl font-bold text-yellow-500 mb-2">Full Retraining</h3>
                    <p className="text-xs text-gray-500 mb-4 h-10">Re-initializing model parameters and training on remaining data from epoch 0.</p>

                    <div className="w-full bg-gray-900 rounded-full h-4 overflow-hidden mb-2">
                        <motion.div
                            className="h-full bg-yellow-500"
                            style={{ width: `${progress.retraining}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-xs font-mono text-gray-400">
                        <span>Epoch: {Math.floor(progress.retraining)}/100</span>
                        <span>Time: {Math.floor(progress.retraining * 0.8)}h</span>
                    </div>
                </div>

                {/* Unlearning Simulation */}
                <div className="bg-gray-800/50 p-6 rounded-xl border border-blue-500/50 shadow-lg shadow-blue-500/10">
                    <h3 className="text-xl font-bold text-blue-400 mb-2">Machine Unlearning</h3>
                    <p className="text-xs text-gray-400 mb-4 h-10">Updating specific weights/shards affected by the forgetting target.</p>

                    <div className="w-full bg-gray-900 rounded-full h-4 overflow-hidden mb-2">
                        <motion.div
                            className="h-full bg-blue-500"
                            style={{ width: `${progress.unlearning}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-xs font-mono text-gray-400">
                        <span>Optimization Step: {Math.floor(progress.unlearning)}/100</span>
                        <span>Time: {Math.floor(progress.unlearning * 0.05)}h</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-center pt-4">
                {status === "idle" && (
                    <button
                        onClick={startSimulation}
                        className="px-12 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-full text-lg shadow-xl shadow-green-600/30 transition-transform hover:scale-105"
                    >
                        START COMPARISON
                    </button>
                )}
            </div>

            <div className="pt-8 flex justify-between">
                <button
                    onClick={onBack}
                    className="px-6 py-2 rounded-lg font-medium text-gray-400 hover:bg-gray-800 transition-colors"
                >
                    Back
                </button>
                <button
                    disabled={status !== "completed"}
                    onClick={() => {
                        addCommand(`> evaluate_model(model, test_loader)`);
                        onNext();
                    }}
                    className={`px-8 py-3 rounded-lg font-bold transition-all ${status === "completed"
                        ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30"
                        : "bg-gray-800 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    Next: View Results
                </button>
            </div>
        </div>
    );
};

export default Step3_Process;
