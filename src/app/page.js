"use client"
import { useState } from "react";

import Terminal from "./components/terminal";
import Info from "./components/info";
import Playground from "./components/playground";

export default function Home() {

  const [commands, setCommands] = useState([]);
  const addCommand = (newCommand) => {
    setCommands([...commands, `>>> ${newCommand}`]);
  };
  const [info, setInfo] = useState('Welcome to the Machine Unlearning Playground, inspired by the "Deep Regression Unlearning" paper.');

  const updateInfo = (info) => {
    setInfo(info);
  }
  return (
    <div className="h-screen bg-gray-900 text-white">
      <div className="grid grid-rows-2 grid-cols-1 h-full" style={{ gridTemplateRows: '80% 20%' }}>

        {/* Stage Component */}
        <div className="circuit bg-gray-800 p-4 flex justify-center h-full w-full">
          <div className=" w-9/12 flex flex-col items-center">
            <div className="p-2 text-3xl flex justify-center w-full border border-green-700 rounded-md">Machine Unlearning Demo</div>

            {/* Playground Component */}
            <Playground addCommand={addCommand} updateInfo={updateInfo}/>

          </div>
          {/* Info Component */}
          <Info info={info}/>

        </div>

        {/* Terminal Component */}
        <Terminal commands={commands} />

      </div>
    </div>
  );
}
