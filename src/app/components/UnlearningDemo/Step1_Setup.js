import React, { useEffect } from "react";
import { motion } from "framer-motion";

const datasets = [
    { id: "AgeDB", name: "AgeDB", desc: "16k images, Age 0-101", color: "bg-purple-600" },
    { id: "IMDBWiki", name: "IMDB-Wiki", desc: "500k images, Celebrities", color: "bg-indigo-600" },
    { id: "CIFAR100", name: "CIFAR-100", desc: "60k images, 100 classes", color: "bg-pink-600" },
];

const models = [
    { id: "ResNet18", name: "ResNet-18", desc: "Deep Residual Network" },
    { id: "AllCNN", name: "AllCNN", desc: "All Convolutional Net" },
    { id: "MobileNet", name: "MobileNet", desc: "Efficient Mobile Architecture" },
];

const Step1_Setup = ({ dataset, setDataset, model, setModel, addCommand, onNext }) => {

    useEffect(() => {
        if (dataset && model) {
            // Only run this when both are selected for the first time or changed
            // addCommand(`Selected Dataset: ${dataset}`);
            // addCommand(`Selected Model: ${model}`);
        }
    }, [dataset, model]);

    const handleDatasetSelect = (id) => {
        setDataset(id);
        addCommand(`> Loading dataset: ${id}... [Done]`);
    };

    const handleModelSelect = (id) => {
        setModel(id);
        addCommand(`> Initializing model architecture: ${id}... [Done]`);
    };

    return (
        <div className="flex flex-col space-y-8">
            <div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-200">1. Setup Environment</h2>
                <p className="text-gray-400 mb-6">
                    To begin, we need a dataset to train our model on, and a model architecture to learn from that data.
                </p>
            </div>

            {/* Dataset Selection */}
            <div>
                <h3 className="text-lg font-medium text-blue-300 mb-3">Choose Dataset</h3>
                <div className="grid grid-cols-3 gap-4">
                    {datasets.map((d) => (
                        <motion.button
                            key={d.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDatasetSelect(d.id)}
                            className={`p-4 rounded-xl border-2 transition-all ${dataset === d.id
                                ? "border-blue-400 bg-blue-500/20 shadow-lg shadow-blue-500/20"
                                : "border-gray-700 bg-gray-800 hover:border-gray-500"
                                }`}
                        >
                            <div className={`w-8 h-8 rounded-full mb-3 ${d.color} opacity-80`} />
                            <div className="font-bold text-left">{d.name}</div>
                            <div className="text-xs text-gray-400 text-left mt-1">{d.desc}</div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Model Selection */}
            <div>
                <h3 className="text-lg font-medium text-green-300 mb-3">Choose Model</h3>
                <div className="grid grid-cols-3 gap-4">
                    {models.map((m) => (
                        <motion.button
                            key={m.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleModelSelect(m.id)}
                            className={`p-4 rounded-xl border-2 transition-all ${model === m.id
                                ? "border-green-400 bg-green-500/20 shadow-lg shadow-green-500/20"
                                : "border-gray-700 bg-gray-800 hover:border-gray-500"
                                }`}
                        >
                            <div className="font-bold text-left">{m.name}</div>
                            <div className="text-xs text-gray-400 text-left mt-1">{m.desc}</div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Next Button */}
            <div className="pt-8 flex justify-end">
                <button
                    disabled={!dataset || !model}
                    onClick={() => {
                        addCommand(`> device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')`);
                        addCommand(`> dataset = torchvision.datasets.${dataset}(root='./data', download=True)`);
                        addCommand(`> model = models.${model.toLowerCase()}(pretrained=True).to(device)`);
                        onNext();
                    }}
                    className={`px-8 py-3 rounded-lg font-bold transition-all ${dataset && model
                        ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30"
                        : "bg-gray-800 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    Next: Select Data to Forget
                </button>
            </div>
        </div>
    );
};

export default Step1_Setup;
