"use client";
import { useState, useEffect } from "react";

import Terminal from "./components/terminal";
import Info from "./components/info";
import Playground from "./components/playground";
import Loading from "./components/loading";

export default function Home() {
  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    const handleCopy = (event) => {
      event.clipboardData.setData("text/plain", "Copying is not allowed");
      event.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopy);
    };
  }, []);

  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const [reference, setReference] = useState(
    'Deep Regression Unlearning : <a href="https://arxiv.org/abs/2210.08196">Deep Regression Unlearning</a>'
  );

  const [info, setInfo] = useState(
    "Welcome to the Machine Unlearning Playground, inspired by the Deep Regression Unlearning paper."
  );

  const updateInfo = (info) => {
    setInfo(info);
  };

  const updateReference = (reference) => {
    setReference(reference);
  };

  const addCommand = (command) => {
    setCommands((commands) => [...commands, command]);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="h-screen bg-gray-900 text-white">
        <div
          className="grid grid-rows-2 grid-cols-1 h-full"
          style={{ gridTemplateRows: "80% 20%" }}
        >
          {/* Stage Component */}
          <div className="circuit bg-gray-800 p-4 flex justify-center h-full w-full">
            <div className=" w-9/12 flex flex-col items-center justify-center">
              <div className="p-2 text-3xl flex items-center justify-center w-full border border-green-700 rounded-md">
                <span>Machine Unlearning Demo</span>
                {/* <span style={{ padding: "2px" }}>|</span> */}
              </div>

              {/* Playground Component */}
              <Playground
                addCommand={addCommand}
                updateInfo={updateInfo}
                updateReference={updateReference}
              />
            </div>
            {/* Info Component */}
            <Info info={info} reference={reference} />
          </div>

          {/* Terminal Component */}
          <Terminal commands={commands} />
        </div>
      </div>
    </>
  );
}
