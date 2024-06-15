import { useState } from "react";

const Playground = ({ addCommand, updateInfo }) => {
  const [datasetId, setDataset] = useState(0);
  const datasets = [
    "AgeDB",
    "IMDBWiki",
    "CIFAR100",
  ];
  const dataset_info = [
    "AgeDB contains images of people with different age groups. from 1 to 100.",
    "This is IMDBWiki dataset.",
    "This dataset contains cifar100",
  ]
  const [selectedDataset, setSelectedDataset] = useState(null);
  const handleRadioClickDataset = (index) => {
    setSelectedDataset(index);
    updateInfo(dataset_info[index]);
    setDataset(index);
  };

  const [modelId, setModel] = useState(0);
  const models = [
    "AllCNN",
    "ResNet18",
    "DenseNet169",
  ];
  const models_info = [
    "AllCNN 1",
    "ResNet18 2",
    "DenseNet169 3",
  ]
  const [selectedModel, setSelectedModel] = useState(null);
  const handleRadioClickModel = (index) => {
    setSelectedModel(index);
    updateInfo(models_info[index]);
    setModel(index);
  };

  const [selectionId, setSelection] = useState(0);
  const selections = [
    "0-30",
    "30-70",
    "70-100",
  ];
  const selections_info = [
    "Age 0 to Age 30",
    "Age 30 to Age 70",
    "Age 70 to Age 100",
  ];

  const [selectedSelection, setSelectedSelection] = useState(null);
  const handleRadioClickSelection = (index) => {
    setSelectedSelection(index);
    updateInfo(selections_info[index]);
    setSelection(index);
  };

  const [buttonId, setButtonId] = useState(0);
  const buttons = [
    "Choose Dataset",
    "Load  " + datasets[datasetId] + " Dataset",
    "Choose Model",
    "Start Training",
    "Evaluate Model",
    "Select Age range to Unlearn",
    "Train Blindspot Model",
    "Start Unlearning",
    "Compare Testing Results",
    "Train Gold Model",
    "Compare Three Models",
    "Membership Inference Attack",
  ];
  const [commandId, setCommandId] = useState(0);
  const commands = [
    "data_dir = 'root/Dataset/" + datasets[datasetId] + ".zip'",
    "dataset = load_and_preprocess_data(dataset)",
    "model = load_model('" + models[modelId] + "')",
    "history = fit_one_cycle(model, dataset, epochs=50, lr=0.01)",
    "evaluate(model)",
    "forget_data = datasets[0:31] and retain_data = datasets[31:100]",
    "blindspot_history = fit_one_cycle(model, dataset, epochs=2, lr=0.01)",
    "history = fit_one_forget_cycle(epochs, bdstu_model, bdst_model,  utrain_loader, val_loader, lr = 0.001, device = device, save_path = save_path)",
    "compare_test(model, unlearned_model)",
    ""
  ];
  const stateChange = () => {
    if (buttonId === 0) {
      updateInfo('Unzip and preprocess dataset using a user-defined function. Click on Load button.')
    }
    else if (buttonId === 1) {
      updateInfo('Choose a model to train on ' + datasets[datasetId])
    }
    else if (buttonId === 2) {
      updateInfo('You have choosen ' + datasets[datasetId] + ' dataset and ' + models[modelId] + ' model.')
    }
    else if (buttonId === 3) {
      updateInfo('Training has been finished. Now you can test the model to check training loss. Click on evaluate button.')
    }
    else if (buttonId === 4) {
      updateInfo('You can see the training and testing results. Now you can select data to be forgotten by the model.')
    }
    else if (buttonId === 5) {
      updateInfo('Now train the retain dataset using ' + models[modelId] + ' model for a few epochs. We will call this as a blindspot model as it has not seen the forget set of data.')
    }
    else if (buttonId === 6) {
      updateInfo('Now Unlearn the trained model using blindspot model.')
    }
    else if (buttonId === 7) {
      updateInfo('Model has unlearned the forget set of data. Now evaluate the models(trained and unlearned) on both forget and retain set of data.')
    }
    else if (buttonId === 9) {
      updateInfo('Model has unlearned the forget set of data. Now evaluate the models(trained and unlearned) on both forget and retain set of data.')
    }
    else if (buttonId === 10) {
      updateInfo('Model has unlearned the forget set of data. Now evaluate the models(trained and unlearned) on both forget and retain set of data.')
    }
    else if (buttonId === 11) {
      updateInfo('Model has unlearned the forget set of data. Now evaluate the models(trained and unlearned) on both forget and retain set of data.')
    }
    else if (buttonId === 12) {
      updateInfo('Model has unlearned the forget set of data. Now evaluate the models(trained and unlearned) on both forget and retain set of data.')
    }
    else if (buttonId === 13) {
      updateInfo('Model has unlearned the forget set of data. Now evaluate the models(trained and unlearned) on both forget and retain set of data.')
    }
    else {
      updateInfo(null);
    }
    setCommandId(commandId + 1);
    addCommand(commands[commandId]);

    setButtonId(buttonId + 1);
  }
  return (
    <div className="mt-2 h-full w-full border border-green-700 rounded-md flex justify-center items-center relative">
      {buttonId === 0 ?
        (
          <div className="flex flex-col">
            <div className="flex">
              {datasets.map((dataset, index) => (
                <label key={index} className={`m-2 p-2 w-20 border rounded-md text-center cursor-pointer ${selectedDataset === index ? 'bg-blue-500 text-white' : 'bg-green-500 text-black'
                  } hover:bg-green-600 active:bg-blue-600`}>
                  <input
                    type="radio"
                    className="hidden"
                    id={`radio-${index}`}
                    name="dataset"
                    value={dataset}
                    onClick={() => handleRadioClickDataset(index)}
                  />
                  {dataset}
                </label>
              ))}
            </div>

            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={stateChange}>
              {buttons[buttonId]}
            </button>
          </div>
        )
        : buttonId === 1 ?
          (
            <div>
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={stateChange}>
                {buttons[buttonId]}
              </button>
            </div>
          )
          : buttonId === 2 ? (
            <div className="flex flex-col">
              <div className="flex">
                {models.map((model, index) => (
                  <label key={index} className={`m-2 p-2 w-20 border rounded-md text-center cursor-pointer ${selectedModel === index ? 'bg-blue-500 text-white' : 'bg-green-500 text-black'
                    } hover:bg-green-600 active:bg-blue-600`}>
                    <input
                      type="radio"
                      className="hidden"
                      id={`radio-${index}`}
                      name="model"
                      value={model}
                      onClick={() => handleRadioClickModel(index)}
                    />
                    {model}
                  </label>
                ))}
              </div>
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={stateChange}>
                {buttons[buttonId]}
              </button>
            </div>
          )
            : buttonId === 3 ?
              (
                <div>
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={stateChange}>
                    {buttons[buttonId]}
                  </button>
                </div>
              )
              : buttonId === 4 ?
                (
                  <div>
                    <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={stateChange}>
                      {buttons[buttonId]}
                    </button>
                  </div>
                )

                : buttonId === 5 ?
                  (
                    <div>
                      <div className="absolute left-0 top-0 p-5 flex flex-col text-green-500">
                        <span>Dataset : {datasets[datasetId]}</span>
                        <span>Model : {models[modelId]}</span>
                        <span>Epochs : 50</span>
                        <span>Training Loss : 0.090</span>
                        <span>Testing Loss : 0.12</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex">
                          {selections.map((selection, index) => (
                            <label key={index} className={`m-2 p-2 w-20 border rounded-md text-center cursor-pointer ${selectedSelection === index ? 'bg-blue-500 text-white' : 'bg-green-500 text-black'
                              } hover:bg-green-600 active:bg-blue-600`}>
                              <input
                                type="radio"
                                className="hidden"
                                id={`radio-${index}`}
                                name="selection"
                                value={selection}
                                onClick={() => handleRadioClickSelection(index)}
                              />
                              {selection}
                            </label>
                          ))}
                        </div>

                        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={stateChange}>
                          {buttons[buttonId]}
                        </button>
                      </div>
                    </div>
                  )
                  : buttonId === 6 ?
                    (
                      <div>
                        <div className="absolute left-0 top-0 p-5 flex flex-col text-green-500">
                          <span>Dataset : {datasets[datasetId]}</span>
                          <span>Model : {models[modelId]}</span>
                          <span>Epochs : 50</span>
                          <span>Training Loss : 0.090</span>
                          <span>Testing Loss : 0.12</span>
                        </div>
                        <div>
                          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={stateChange}>
                            {buttons[buttonId]}
                          </button>
                        </div>
                      </div>
                    )
                    : buttonId === 7 ?
                      (
                        <div>
                          <div className="absolute left-0 top-0 p-5 flex flex-col text-green-500">
                            <span>Dataset : {datasets[datasetId]}</span>
                            <span>Model : {models[modelId]}</span>
                            <span>Epochs : 50</span>
                            <span>Training Loss : 0.090</span>
                            <span>Testing Loss : 0.12</span>
                          </div>
                          <div>
                            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={stateChange}>
                              {buttons[buttonId]}
                            </button>
                          </div>
                        </div>
                      )
                      : buttonId === 8 ?
                        (
                          <div>
                            <div className="absolute left-0 top-0 p-5 flex flex-col text-green-500">
                              <span>Dataset : {datasets[datasetId]}</span>
                              <span>Model : {models[modelId]}</span>
                              <span>Epochs : 50</span>
                              <span>Training Loss : 0.090</span>
                              <span>Testing Loss : 0.12</span>
                            </div>
                            <div>
                              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={stateChange}>
                                {buttons[buttonId]}
                              </button>
                            </div>
                          </div>
                        )

                        : <div>Finished</div>
      }
    </div>
  );
};

export default Playground;
