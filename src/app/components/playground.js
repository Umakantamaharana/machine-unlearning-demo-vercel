import { useState, useEffect } from "react";
import Loading from "./loading";
import Image from "next/image";
import BarChart from "./barchart";

const Playground = ({ addCommand, updateInfo, updateReference }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [buttonId, setButtonId] = useState(0);
  const [commandId, setCommandId] = useState(0);
  const [datasetId, setDataset] = useState(0);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [modelId, setModel] = useState(0);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectionId, setSelection] = useState(0);
  const [selectedSelection, setSelectedSelection] = useState(null);
  const [reference, setReference] = useState(['No referecne !'])

  const datasets = [
    "AgeDB",
    "IMDBWiki",
    "CIFAR100",
  ];

  const dataset_info = [
    "AgeDB (Age Database) is a dataset specifically curated for age estimation tasks, offering high-quality images of faces annotated with age labels. The dataset comprises 16,488 images, capturing a broad age range from 0 to 101 years. Each image in AgeDB is meticulously annotated with the age of the person depicted, making it an invaluable resource for age estimation and facial recognition studies. This dataset supports research in age-invariant face recognition and other applications requiring precise age information. AgeDB is generally available for research purposes under specific licenses or upon request, contributing significantly to advancements in the field of age estimation.",
    "IMDB-Wiki is one of the largest publicly available datasets designed for age and gender prediction, sourced from two major databases: IMDb and Wikipedia. This extensive dataset includes over 500,000 images of celebrities and public figures, with 460,723 images sourced from IMDb and 62,328 from Wikipedia. Each image in the IMDB-Wiki dataset is annotated with the age, gender, and name of the individual, providing a rich source of data for demographic studies and machine learning tasks related to age and gender estimation. The dataset's large size and detailed annotations make it ideal for training robust models in facial recognition and related fields. IMDB-Wiki is freely available for academic and research purposes, supporting a wide range of studies and applications.",
    "CIFAR-100 (Canadian Institute For Advanced Research) is a widely used dataset in the machine learning and computer vision community, primarily for training and benchmarking algorithms. This dataset consists of 60,000 32x32 color images, categorized into 100 fine-grained classes, each containing 600 images. The images are divided into a training set of 50,000 images and a test set of 10,000 images. In addition to the fine-grained labels, each image is also associated with one of 20 coarse-grained superclasses, adding another layer of categorization. CIFAR-100 is commonly used for object recognition and image classification tasks, providing a challenging and diverse dataset for algorithm development. It is freely available for research and educational purposes, making it a staple resource for machine learning practitioners and researchers.",
  ]

  const dataset_reference = [
    '<p>AgeDB Database : <a href="https://www.kaggle.com/datasets/nitingandhi/agedb-database">agedb-database</p>',
    '<p>IMDBWiki Database : <a href="https://www.kaggle.com/datasets/abhikjha/imdb-wiki-faces-dataset">imdb-wiki-faces-dataset</p>',
    '<p>CIFAR100 Database : <a href="https://www.kaggle.com/datasets/fedesoriano/cifar100">cifar100</p>',

  ]

  const handleRadioClickDataset = (index) => {
    setSelectedDataset(index);
    updateInfo(dataset_info[index]);
    updateReference(dataset_reference[index])
    setDataset(index);
  };


  const models = [
    "AllCNN",
    "ResNet18",
    "MobileNet",
  ];

  const models_info = [
    "The AllCNN model is a convolutional neural network designed for image classification. It features a sequence of convolutional layers with optional batch normalization and dropout, structured into three main blocks separated by strided convolutions. The final block includes a 1x1 convolution and average pooling before a fully connected layer for classification. The model outputs both the final prediction and intermediate activations from each convolutional layer. The network's filter sizes can be scaled by a given percentage.",
    "The ResNet-18 model is a deep convolutional neural network designed for image classification. It features an initial convolutional layer with batch normalization and ReLU activation, followed by four residual blocks, each containing multiple convolutional layers with skip connections to help prevent vanishing gradients. The network includes a global average pooling layer before the final fully connected layer for classification. It is designed to maintain high performance while being computationally efficient.",
    "MobileNet is a family of efficient deep neural networks designed for mobile and embedded vision applications. It uses depthwise separable convolutions to drastically reduce the number of parameters and computational cost compared to standard convolutions. MobileNet includes a series of lightweight convolutional layers, each followed by batch normalization and ReLU activation, and uses a global average pooling layer before the final fully connected layer for classification. The architecture is highly customizable with width and resolution multipliers to balance the trade-off between latency and accuracy.",
  ]

  const models_reference = [
    '<p>AllCNN Model : <a href="https://github.com/ayushkumartarun/deep-regression-unlearning/blob/main/models.py">all-cnn</p>',
    '<p>ResNet18 Model : <a href="https://pytorch.org/vision/master/models/generated/torchvision.models.resnet18.html">resnet18</p>',
    '<p>MobileNet Model : <a href="https://pytorch.org/hub/pytorch_vision_mobilenet_v2/">pytorch_vision_mobilenet_v2</p>',
  ]

  const handleRadioClickModel = (index) => {
    setSelectedModel(index);
    updateInfo(models_info[index]);
    updateReference(models_reference[index]);
    setModel(index);
  };


  const selections = [
    "1-30",
    "31-70",
    "71-100",
  ];

  const selections_info = [
    "Model will forget faces of person from age 1 to 30. And it can only identify person from 31 to 100.",
    "Model will forget faces of person from age 31 to 70. And it can only identify person from 0 to 30 and 71 to 100.",
    "Model will forget faces of person from age 71 to 100. And it can only identify person from 0 to 70.",
  ];


  const handleRadioClickSelection = (index) => {
    setSelectedSelection(index);
    updateInfo(selections_info[index]);
    setSelection(index);
  };


  const buttons = [
    "Choose Dataset",
    "Load  " + datasets[datasetId] + " Dataset",
    "Choose Model",
    "Start Training",
    "Select Age range to Unlearn",
    "Evaluate Model",
    "Train Blindspot Model",
    "Start Unlearning",
    "Train Gold Model",
    "Compare Three Models",
    "See Full Results",
  ];

  const commands = [
    "data_dir = 'root/Dataset/" + datasets[datasetId] + ".zip'",
    "dataset = load_and_preprocess_data(dataset)",
    "model = load_model('" + models[modelId] + "')",
    "history = fit_one_cycle(model, dataset, epochs=100, lr=0.01)",
    "forget_data = datasets[0:31] and retain_data = datasets[31:100]",
    "evaluate(model)",
    "blindspot_history = fit_one_cycle(model, dataset, epochs=2, lr=0.01)",
    "history = fit_one_forget_cycle(epochs, bdstu_model, bdst_model,  utrain_loader, val_loader, lr = 0.001, device = device, save_path = save_path)",
    "gold_model_history = fit_one_cycle(model, retain_data, epochs=2, lr=0.01)",
    "compare_test(model, gold_model, unlearned_model)",
    "exit()"
  ];

  const stateChange = () => {
    setIsLoading(true);

    setTimeout(() => {
      if (buttonId === 0) {
        updateInfo('Unzip and Load the Dataset. Click on the "Load" button to start the process. This will 1. Unzip the dataset file. 2. Apply your user-defined preprocessing function to each image. 3. Load the preprocessed images for further analysis.Unzip and preprocess dataset using a user-defined function.')
      }
      else if (buttonId === 1) {
        updateInfo('Choose a model to train on ' + datasets[datasetId] + '. Click on any model to know its architecture.')
      }
      else if (buttonId === 2) {
        updateInfo('You have choosen ' + datasets[datasetId] + ' dataset and ' + models[modelId] + ' model.')
      }
      else if (buttonId === 3) {
        updateInfo('Training has been finished. Now you can select data to be forgotten by the model.')
      }
      else if (buttonId === 4) {
        updateInfo('Now you can test the model to check loss of both forget and retain dataset. Click on evaluate button.')
      }
      else if (buttonId === 5) {
        updateInfo('Now train the retain dataset using ' + models[modelId] + ' model for a few epochs. We will call this as a blindspot model as it has not seen the forget set of data.')
      }
      else if (buttonId === 6) {
        updateInfo('Now Unlearn the trained model using blindspot model.')
      }
      else if (buttonId === 7) {
        updateInfo('Model has unlearned the forget set of data. Now train a gold standard model.')
      }
      // else if (buttonId === 8) {
      //   updateInfo('Now train a gold standard model which will learn only the retain set of data for a few epochs.')
      // }
      else if (buttonId === 8) {
        updateInfo('We have three models to compare. Trained ' + models[modelId] + ' model, Gold standard model and Unlearned model.')
      }
      else if (buttonId === 9) {
        updateInfo('This is the end of the demo. You can see the full results by clicking the button.')
      }
      else if (buttonId === 10) {
        updateInfo('You can restart the demo by clicking on the HomePage button.')
      }
      else {
        updateInfo(null);
        updateReference(null);
      }
      setCommandId(commandId + 1);
      addCommand(commands[commandId]);

      setButtonId(buttonId + 1);
      setIsLoading(false);
      updateReference(null);
    }, 200);
  }

  return (
    <>

      {isLoading && <Loading />}

      <div className="mt-2 h-full w-full border border-green-700 rounded-md flex justify-center items-center relative">
        {/* Choose Dataset */}
        {buttonId === 0 ? (
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
          // Load Dataset
          : buttonId === 1 ? (
            <div>
              <div className="absolute left-0 top-0 p-5 flex flex-col text-green-500">
                <span>Dataset : {datasets[datasetId]}</span>
              </div>
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={stateChange}>
                {buttons[buttonId]}
              </button>
            </div>
          )
            // Choose Model
            : buttonId === 2 ? (
              <div className="flex flex-col">
                <div className="absolute left-0 top-0 p-5 flex flex-col text-green-500">
                  <span>Dataset : {datasets[datasetId]}</span>
                </div>
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
              // Start Training
              : buttonId === 3 ? (
                <div>
                  <div className="absolute left-0 top-0 p-5 flex flex-col text-green-500">
                    <span>Dataset : {datasets[datasetId]}</span>
                    <span>Model : {models[modelId]}</span>
                    <span>Epochs : 100</span>
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={stateChange}>
                    {buttons[buttonId]}
                  </button>
                </div>
              )
                // Select age-group
                : buttonId === 4 ? (
                  <div>
                    <div className="absolute left-0 top-0 p-5 flex flex-col text-green-500">
                      <span>Dataset : {datasets[datasetId]}</span>
                      <span>Model : {models[modelId]}</span>
                      <span>Epochs : 100</span>
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
                  // Evaluate Model
                  : buttonId === 5 ? (
                    <div>
                      <div className="absolute left-0 top-0 p-5 flex flex-col text-green-500">
                        <span>Dataset : {datasets[datasetId]}</span>
                        <span>Model : {models[modelId]}</span>
                        <span>Epochs : 100</span>
                        <span>Forget Data : {selections[selectionId]}</span>
                        <span>Retain Data : 31-100</span>
                      </div>
                      <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={stateChange}>
                        {buttons[buttonId]}
                      </button>
                    </div>
                  )
                    // Train blindspot model
                    : buttonId === 6 ? (
                      <div>
                        <div className="absolute left-0 top-0 p-5 flex flex-col text-green-500">
                          <span>Dataset : {datasets[datasetId]}</span>
                          <span>Model : {models[modelId]}</span>
                          <span>Epochs : 100</span>
                          <span>Forget Data : {selections[selectionId]}</span>
                          <span>Retain Data : 31-100</span>
                          <span>Forget Data Loss : <b style={{ background: 'black' }}>12.76</b></span>
                          <span>Retain Data Loss : <b style={{ background: 'black' }}>9.33</b></span>
                        </div>
                        <div>
                          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={stateChange}>
                            {buttons[buttonId]}
                          </button>
                        </div>
                      </div>
                    )
                      // Start Unlearning
                      : buttonId === 7 ? (
                        <div>
                          <div className="absolute left-0 top-0 p-5 flex flex-col text-green-500">
                            <span>Dataset : {datasets[datasetId]}</span>
                            <span>Model : {models[modelId]}</span>
                            <span>Epochs : 100</span>
                            <span>Forget Data : {selections[selectionId]}</span>
                            <span>Retain Data : 31-100</span>
                            <span>Forget Data Loss : <b style={{ background: 'black' }}>12.76</b></span>
                            <span>Retain Data Loss : <b style={{ background: 'black' }}>9.33</b></span>
                            <span>Blindspot Model : {models[modelId]}</span>
                            <span>Epochs : 2</span>
                          </div>
                          <div>
                            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={stateChange}>
                              {buttons[buttonId]}
                            </button>
                          </div>
                        </div>
                      )
                        // Compare Testing results
                        // : buttonId === 8 ? (
                        //   <div>
                        //     <div className="absolute left-0 top-0 p-5 flex flex-col text-green-500">
                        //       <span>Dataset : {datasets[datasetId]}</span>
                        //       <span>Model : {models[modelId]}</span>
                        //       <span>Epochs : 100</span>
                        //       <span>Training Loss : <b style={{ background: 'black' }}>0.090</b></span>
                        //       <span>Testing Loss : <b style={{ background: 'black' }}>0.12</b></span>
                        //       <span>Forget Data : {selections[selectionId]}</span>
                        //       <span>Retain Data : 31-100</span>
                        //       <span>Blindspot Model : {models[modelId]}</span>
                        //       <span>Epochs : 2</span>
                        //       <span>Forget Data Loss : <b style={{ background: 'black' }}>21.63</b></span>
                        //       <span>Retain Data Loss : <b style={{ background: 'black' }}>9.97</b></span>
                        //     </div>
                        //     <div className="absolute left-0 top-0 p-5 flex flex-col text-green-500">
                        //       <span>Dataset : {datasets[datasetId]}</span>
                        //       <span>Model : {models[modelId]}</span>
                        //       <span>Epochs : 100</span>
                        //       <span>Training Loss : 0.090</span>
                        //       <span>Testing Loss : 0.12</span>
                        //     </div>
                        //     <div>
                        //       <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={stateChange}>
                        //         {buttons[buttonId]}
                        //       </button>
                        //     </div>
                        //   </div>
                        // )
                        // Train Gold Model
                        : buttonId === 8 ? (
                          <div>
                            <div className="absolute left-0 top-0 p-5 flex flex-col text-green-500">
                              <span>Dataset : {datasets[datasetId]}</span>
                              <span>Model : {models[modelId]}</span>
                              <span>Epochs : 100</span>
                              <span>Forget Data : {selections[selectionId]}</span>
                              <span>Retain Data : 31-100</span>
                              <span>Forget Data Loss : <b style={{ background: 'black' }}>12.76</b></span>
                              <span>Retain Data Loss : <b style={{ background: 'black' }}>9.33</b></span>
                              <span>Blindspot Model : {models[modelId]}</span>
                              <span>Epochs : 2</span>
                              <span>Forget Data Loss : <b style={{ background: 'black' }}>21.63</b></span>
                              <span>Retain Data Loss : <b style={{ background: 'black' }}>9.97</b></span>
                              <span>Gold Model : {models[modelId]}</span>
                              <span>Epochs : 1</span>
                            </div>
                            <div>
                              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={stateChange}>
                                {buttons[buttonId]}
                              </button>
                            </div>
                          </div>
                        )
                          // Compare Three Models
                          : buttonId === 9 ? (
                            <div>
                              <div className="absolute left-0 top-0 p-5 flex flex-col text-green-500">
                                <span>Dataset : {datasets[datasetId]}</span>
                                <span>Model : {models[modelId]}</span>
                                <span>Epochs : 100</span>
                                <span>Forget Data : {selections[selectionId]}</span>
                                <span>Retain Data : 31-100</span>
                                <span>Forget Data Loss : <b style={{ background: 'black' }}>12.76</b></span>
                                <span>Retain Data Loss : <b style={{ background: 'black' }}>9.33</b></span>
                                <span>Blindspot Model : {models[modelId]}</span>
                                <span>Epochs : 2</span>
                                <span>Forget Data Loss : <b style={{ background: 'black' }}>21.63</b></span>
                                <span>Retain Data Loss : <b style={{ background: 'black' }}>9.97</b></span>
                                <span>Gold Model : {models[modelId]}</span>
                                <span>Epochs : 1</span>
                                <span>Forget Data Loss : <b style={{ background: 'black' }}>24.30</b></span>
                                <span>Retain Data Loss : <b style={{ background: 'black' }}>11.38</b></span>
                              </div>
                              <div>
                                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={stateChange}>
                                  {buttons[buttonId]}
                                </button>
                              </div>
                            </div>
                          )
                            // Membership Inference Attack
                            : buttonId === 10 ? (
                              <div className="flex flex-col items-center justify-center">
                                <div className="absolute left-0 top-0 p-5 flex flex-col text-green-500">
                                  <span>Dataset : {datasets[datasetId]}</span>
                                  <span>Model : {models[modelId]}</span>
                                  <span>Epochs : 100</span>
                                  <span>Forget Data : {selections[selectionId]}</span>
                                  <span>Retain Data : 31-100</span>
                                  <span>Forget Data Loss : <b style={{ background: 'black' }}>12.76</b></span>
                                  <span>Retain Data Loss : <b style={{ background: 'black' }}>9.33</b></span>
                                  <span>Blindspot Model : {models[modelId]}</span>
                                  <span>Epochs : 2</span>
                                  <span>Forget Data Loss : <b style={{ background: 'black' }}>21.63</b></span>
                                  <span>Retain Data Loss : <b style={{ background: 'black' }}>9.97</b></span>
                                  <span>Gold Model : {models[modelId]}</span>
                                  <span>Epochs : 1</span>
                                  <span>Forget Data Loss : <b style={{ background: 'black' }}>24.30</b></span>
                                  <span>Retain Data Loss : <b style={{ background: 'black' }}>11.38</b></span>
                                </div>
                                <div className="m-1 text-center">
                                  <h1 className="text-xl font-bold mb-4">Loss Comparison Chart</h1>
                                  <BarChart />
                                </div>
                                <div>
                                  <button className="m-3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={stateChange}>
                                    {buttons[buttonId]}
                                  </button>
                                </div>
                              </div>
                            )

                              :
                              <div className="flex flex-col align-middle justify-center">
                                <div className="absolute left-0 top-0 p-5 flex flex-col text-green-500">
                                  <span>Model : {models[modelId]}</span>
                                  <span>Forget Data : {selections[selectionId]}</span>
                                  <span>Retain Data : 31-100</span>
                                  <span>Forget Data Loss : <b style={{ background: 'black' }}>12.76</b></span>
                                  <span>Retain Data Loss : <b style={{ background: 'black' }}>9.33</b></span>
                                  <span>Blindspot Model : {models[modelId]}</span>
                                  <span>Forget Data Loss : <b style={{ background: 'black' }}>21.63</b></span>
                                  <span>Retain Data Loss : <b style={{ background: 'black' }}>9.97</b></span>
                                  <span>Gold Model : {models[modelId]}</span>
                                  <span>Forget Data Loss : <b style={{ background: 'black' }}>24.30</b></span>
                                  <span>Retain Data Loss : <b style={{ background: 'black' }}>11.38</b></span>
                                </div>
                                <Image
                                  src="/results.png"
                                  alt="Results"
                                  width={600}
                                  height={400}
                                  style={{ border: '2px solid green', borderRadius: '10px', padding: '10px' }}
                                  className="m-3"
                                />
                                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={() => { window.location.reload() }}>
                                  HomePage
                                </button>
                              </div>
        }
      </div>
    </>
  );
};

export default Playground;
