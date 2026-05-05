# Gamified Networking Learning App (Duolingo-Style)

### **Team Members**
*   **Elif Sedef** – 21091019
*   **Emirhan Duru** – 22091019
*   **Umut Ercan** - 22091021
*   **Öykü Boğazkesenli**
*   **Sami Fathi Karaveli** - 22091032

**Repository:** [github.com/Bogazkesenli/Gamifiednetworkinglearningapp](https://github.com/Bogazkesenli/Gamifiednetworkinglearningapp)

---

## **Project Overview**
This project designs and implements an interactive, gamified learning application focused on **Computer Networking Foundations**. Inspired by the **Duolingo** model, the app transforms complex networking theories—such as the OSI Model, TCP/IP protocols, and network hardware—into bite-sized, engaging lessons. It aims to bridge the gap between abstract technical concepts and practical understanding through structured progress and instant feedback.

## **Purpose**
Networking is often perceived as a daunting subject due to its abstract nature and heavy terminology. This project aims to:
*   **Simplify Complex Concepts:** Break down networking layers and protocols into "Micro-learning" units.
*   **Increase Engagement:** Utilize gamification elements like XP, health systems (lives), and level progression to maintain student motivation.
*   **Provide Immediate Feedback:** Ensure students learn from their mistakes in real-time, a core principle in effective instructional design.

## **Real-World Educational Need**
In the field of Computer Education and Instructional Technology (BÖTE), there is a growing need for digital materials that:
1.  **Reduce Cognitive Load:** Traditional textbooks often overwhelm students. Our app uses "chunking" to present information in manageable segments.
2.  **Support Self-Paced Learning:** Students can master networking fundamentals at their own speed, repeating difficult units until proficiency is reached.
3.  **Active Learning:** Moving beyond passive reading, the app requires active decision-making through matching, sorting, and scenario-based questions.

## **Scope**

| Element | Target / Description |
| :--- | :--- |
| **Instructional Units** | OSI Layers, IP Addressing, Protocols (HTTP, FTP, TCP), Network Hardware |
| **Interaction Types** | Multiple Choice, Drag & Drop (Matching), Fill-in-the-blanks, Scenario Sorting |
| **Gamification Features** | Health System (Hearts), Progress Bars, Unit Unlocks, XP Rewards |
| **Tech Stack** | HTML5, CSS3 (Modern UI/UX), JavaScript (ES6+), LocalStorage |

## **Project Architecture**
The application is structured to ensure scalability and clean code standards:
*   **`index.html`**: The main entry point and dynamic container for the learning environment.
*   **`style.css`**: Features a modern, Duolingo-inspired interface with rounded corners, pastel color palettes, and responsive layouts.
*   **`data.js`**: A structured repository of questions and instructional content categorized by difficulty and topic.
*   **`app.js`**: The core "Game Engine" managing state, user health, scoring, and navigation logic.
*   **`ui.js`**: Handles DOM manipulation to render dynamic content and interactive feedback screens.

## **Instructional Design Principles**
As an educational product, this app is built upon established pedagogical frameworks:
*   **Constructivism:** Students build new knowledge upon previously unlocked concepts.
*   **Gagne’s Events of Instruction:** Each unit is designed to gain attention, inform of objectives, and provide learning guidance.
*   **Scaffolding:** The difficulty curve is carefully managed to guide the learner from basic terminology to complex troubleshooting scenarios.

---

### **How to Run**
1.  Clone the repository.
2.  Open `index.html` in any modern web browser.
3.  Follow the learning path to master networking fundamentals!
