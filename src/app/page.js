"use client"

import Terminal from "./components/terminal";
import Info from "./components/info";

export default function Home() {
  return (
    <div className="h-screen bg-gray-900 text-white">
      <div className="grid grid-rows-2 grid-cols-1 h-full" style={{ gridTemplateRows: '80% 20%' }}>

        {/* Stage Component */}
        <div className="circuit bg-gray-800 p-4 flex justify-center h-full w-full">
          <div className="pt-5 text-5xl w-9/12 flex justify-center">Machine Unlearning Demo</div>

          {/* Info Component */}
          <Info />

        </div>

        {/* Terminal Component */}
        <Terminal />
      
      </div>
    </div>
  );
}
