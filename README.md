# Machine Unlearning Demo

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Here-blue?style=flat-square)](https://machine-unlearning-two.vercel.app/)  
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 🚀 Overview

This is a **web demo** for *Machine Unlearning* — a powerful concept in privacy-preserving machine learning that enables models to "forget" specific data points without full retraining. This app illustrates unlearning techniques using real-world datasets and provides researchers, developers, and privacy advocates with an interactive, easy-to-experience tool.

The demo is built in **Next.js**, hosted on **Vercel**, and was developed in collaboration by [Dr. Murari Mandal](https://murarimandal.github.io) and [Umakanta Maharana](https://umakantamaharana.github.io).

---

## 💡 What Is Machine Unlearning?

Machine Unlearning refers to methods that let a trained machine-learning model selectively remove the influence of some data points — as if they were never included in training — while preserving its performance on the rest of the dataset. This is especially important for respecting data privacy regulations like the “right to be forgotten.” :contentReference[oaicite:0]{index=0}

---

## 📊 Features

- **Dataset Selection**: Choose from provided datasets (e.g., AgeDB).  
- **Unlearning Method**: Demonstrates *Deep Regression Unlearning* (based on research).  
- **Interactive Terminal**: Observe the unlearning process and its effects in real-time.  
- **Insight Links**: Read the relevant research paper directly from the UI.

---

## 🧰 Tech Stack

- **Frontend**: Next.js + React  
- **Styling**: Tailwind CSS  
- **Hosting**: Vercel  
- **Unlearning Logic**: Implemented inside the UI (client-side + server-side)

---

## 📈 How to Run Locally

1. Clone the repo:  
   ```bash
   git clone https://github.com/Umakantamaharana/machine-unlearning-demo-vercel.git
   cd machine-unlearning-demo-vercel
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run in development mode:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser at [http://localhost:3000](http://localhost:3000) to see the demo.

---

## 📚 Research Context & Background

This demo showcases **Deep Regression Unlearning**, a concept from the following paper:

* *Deep Regression Unlearning* — (link provided on the demo UI)

Machine unlearning itself is a rapidly growing area in ML research. Key topics include:

* Privacy and “right to be forgotten” ([Envisioning][1])
* Efficient unlearning without full retraining ([Cornell Computer Science][2])
* Unlearning security and verifiability ([arXiv][3])

---

## 🤝 Contributing

Contributions are very welcome! Here are some ways to help:

* Add support for **more unlearning methods**
* Integrate **other datasets** to test unlearning in different contexts
* Improve the **UI / UX** for better interactivity and data visualization
* Add **explainability / visualization tools** to show how unlearning affects model internals
* Report bugs or suggest enhancements via GitHub Issues

---

## 📬 Contact / Authors

* **Umakanta Maharana** — [Personal Website](https://umakantamaharana.github.io)
* **Dr. Murari Mandal** — [Website](https://murarimandal.github.io)
* For questions or collaborations: **Email** Umakanta at `umakantamaharana70@gmail.com`

---

## ⚖️ License

This project is released under the **MIT License** — see the `LICENSE` file for details.

---

## 👀 Related Work & Community

* Survey of **machine unlearning** techniques: *Awesome Machine Unlearning* by tamlhp ([GitHub][4])
* Foundational research such as “Can Bad Teaching Induce Forgetting?” ([arXiv][5])
* Security-focused work on **verifiable unlearning** ([arXiv][3])

---

[1]: https://www.envisioning.io/vocab/machine-unlearning?utm_source=chatgpt.com "Machine Unlearning | Envisioning Vocab"
[2]: https://www.cs.cornell.edu/content/remember-what-you-want-forget-algorithms-machine-unlearning?utm_source=chatgpt.com "Remember What You Want to Forget: Algorithms for Machine Unlearning | Department of Computer Science"
[3]: https://arxiv.org/abs/2210.09126?utm_source=chatgpt.com "Verifiable and Provably Secure Machine Unlearning"
[4]: https://github.com/tamlhp/awesome-machine-unlearning?utm_source=chatgpt.com "GitHub - tamlhp/awesome-machine-unlearning: Awesome Machine Unlearning (A Survey of Machine Unlearning)"
[5]: https://arxiv.org/abs/2205.08096?utm_source=chatgpt.com "Can Bad Teaching Induce Forgetting? Unlearning in Deep Networks using an Incompetent Teacher"
