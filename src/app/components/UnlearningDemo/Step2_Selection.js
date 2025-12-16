import React from "react";
import { motion } from "framer-motion";
import PeopleCard from "../people-card";

// Simulated data for the grid
const datasetSamples = {
    "AgeDB": [
        { id: 1, name: "Helen", age: 23, img: "/people/HelenHunt_10.jpg" },
        { id: 2, name: "Helen", age: 30, img: "/people/HelenHunt_12.jpg" },
        { id: 3, name: "Helen", age: 37, img: "/people/HelenHunt_20.jpg" },
        { id: 4, name: "Helen", age: 51, img: "/people/HelenHunt_35.jpg" },
        { id: 5, name: "Helen", age: 64, img: "/people/HelenHunt_50.jpg" },
        { id: 6, name: "Goldie", age: 23, img: "/people/GoldieHawn_23.jpg" },
        { id: 7, name: "Goldie", age: 30, img: "/people/GoldieHawn_30.jpg" },
        { id: 8, name: "Goldie", age: 37, img: "/people/GoldieHawn_37.jpg" },
        { id: 9, name: "Goldie", age: 51, img: "/people/GoldieHawn_51.jpg" },
        { id: 10, name: "Goldie", age: 64, img: "/people/GoldieHawn_64.jpg" },
    ],
    "IMDBWiki": [
        { id: 1, name: "Person A", age: 25, img: "/people/HelenHunt_12.jpg" },
        { id: 2, name: "Person B", age: 40, img: "/people/GoldieHawn_30.jpg" },
        { id: 3, name: "Person C", age: 55, img: "/people/HelenHunt_35.jpg" },
        { id: 4, name: "Person D", age: 22, img: "/people/GoldieHawn_23.jpg" },
        { id: 5, name: "Person E", age: 70, img: "/people/HelenHunt_50.jpg" },
    ],
    "CIFAR100": [
        { id: 1, name: "Vehicle", label: "Bicycle", color: "bg-red-500" },
        { id: 2, name: "Animal", label: "Beaver", color: "bg-green-500" },
        { id: 3, name: "Object", label: "Bottle", color: "bg-blue-500" },
        { id: 4, name: "Food", label: "Apple", color: "bg-yellow-500" },
        { id: 5, name: "Nature", label: "Cloud", color: "bg-gray-500" },
    ]
};

const Step2_Selection = ({ dataset, forgetData, setForgetData, addCommand, onNext, onBack }) => {

    const handleSelect = (rangeName, rangeQuery) => {
        setForgetData(rangeName);
        addCommand(`> # Identifying indices for unlearning target: ${rangeName}`);
        addCommand(`> forget_indices = [i for i, (img, label) in enumerate(dataset) if ${rangeQuery}]`);
        addCommand(`> retain_indices = list(set(range(len(dataset))) - set(forget_indices))`);
    };

    return (
        <div className="flex flex-col space-y-6">
            <div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-200">2. Select Data to Unlearn</h2>
                <p className="text-gray-400 mb-6">
                    The model has been trained on the full <b>{dataset}</b> dataset. Now, imagine we receive a &quot;Right to be Forgotten&quot; request.
                    Select updates the subset of data you want the model to forget.
                </p>
            </div>

            {/* Visual Data Representation */}
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Dataset Sample Preview: {dataset}</h4>
                <div className="grid grid-cols-5 gap-4">
                    {(datasetSamples[dataset] || datasetSamples["AgeDB"]).map((p) => (
                        <div key={p.id} className="relative group">
                            {p.img ? (
                                <PeopleCard
                                    src={p.img}
                                    name={p.name}
                                    age={p.age}
                                />
                            ) : (
                                // Fallback for CIFAR or non-image datasets
                                <div className={`w-full aspect-[3/4] ${p.color || 'bg-gray-600'} rounded-lg flex flex-col items-center justify-center p-2 text-center shadow-lg transform transition-transform group-hover:scale-105`}>
                                    <span className="font-bold text-sm text-white drop_shadow-md">{p.label}</span>
                                    <span className="text-xs text-white/80">{p.name}</span>
                                </div>
                            )}

                            {/* Overlay for "Forget" ranges */}
                            {/* Logic: If ID is in forget range (simplified for demo) */}
                            {(forgetData === "1-30" && (p.age <= 30 || p.id <= 2)) && (
                                <div className="absolute inset-0 bg-red-500/40 flex items-center justify-center rounded-lg border-2 border-red-500 z-10">
                                    <div className="bg-red-600 text-white text-xs px-2 py-1 rounded font-bold shadow-sm">FORGET</div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Selection Controls */}
            <div>
                <h3 className="text-lg font-medium text-red-300 mb-3">Unlearning Target</h3>
                <div className="flex space-x-4">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleSelect("1-30", "label <= 30")}
                        className={`flex-1 p-4 rounded-xl border-2 text-left transition-all ${forgetData === "1-30"
                            ? "border-red-500 bg-red-500/20"
                            : "border-gray-700 bg-gray-800 hover:border-gray-600"
                            }`}
                    >
                        <div className="font-bold text-red-200">Age Group: 1 - 30</div>
                        <div className="text-xs text-gray-400 mt-1">Remove all faces typically associated with young adulthood.</div>
                    </motion.button>

                    <motion.button
                        disabled
                        className="flex-1 p-4 rounded-xl border-2 border-gray-800 bg-gray-900 opacity-50 cursor-not-allowed"
                    >
                        <div className="font-bold text-gray-500">Specific Individual (Coming Soon)</div>
                        <div className="text-xs text-gray-600 mt-1">Remove all instances of a single person ID.</div>
                    </motion.button>
                </div>
            </div>

            <div className="pt-8 flex justify-between">
                <button
                    onClick={onBack}
                    className="px-6 py-2 rounded-lg font-medium text-gray-400 hover:bg-gray-800 transition-colors"
                >
                    Back
                </button>
                <button
                    disabled={!forgetData}
                    onClick={() => {
                        addCommand(`> # Preparing dataloaders for unlearning...`);
                        addCommand(`> forget_loader = DataLoader(Subset(dataset, forget_indices), batch_size=32)`);
                        onNext();
                    }}
                    className={`px-8 py-3 rounded-lg font-bold transition-all ${forgetData
                        ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30"
                        : "bg-gray-800 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    Next: Start Unlearning
                </button>
            </div>

        </div>
    );
};

export default Step2_Selection;
