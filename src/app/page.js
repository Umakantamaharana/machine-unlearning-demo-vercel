"use client"

import Terminal from "./components/terminal";
import Info from "./components/info";

export default function Home() {
  return (
    <div className="h-screen bg-gray-900 text-white">
      <div className="grid grid-rows-2 grid-cols-1 h-full" style={{ gridTemplateRows: '80% 20%' }}>

        {/* Stage Component */}
        <div className="circuit bg-gray-800 p-4 flex justify-center h-full w-full">
          <div className=" w-9/12 flex flex-col items-center">
            <div className="p-2 text-3xl flex justify-center w-full border border-green-700 rounded-md">Machine Unlearning Demo</div>
            <div className="mt-2 h-full w-full border border-green-700 rounded-md flex justify-center items-center">Playground</div>
          </div>
          {/* Info Component */}
          <Info />

        </div>

        {/* Terminal Component */}
        <Terminal />

      </div>
    </div>
  );
}
