# 🌍 City-Country Match Game Developer Guide

## **📌 Table of Contents**:
- [Introduction](#-introduction)
- [Project Structure](#-project-structure)
- [Using ES6 Modules](#using-es6-modules-📦)
- [Setting Up URLs](#setting-up-urls-🌐)
- [Security Note](#security-note-🔒)
- [Frontend Components](#-frontend-components)
  - [HTML](#11-html)
  - [CSS](#12-css)
  - [JavaScript](#13-javascript)
- [Backend Components](#-backend-components)
  - [Cloudflare Worker](#21-cloudflare-worker)
  - [Google Apps Script (GAS)](#22-google-apps-script-gas)
- [Game Flow](#-game-flow)
  - [Initialization](#31-initialization)
  - [Gameplay](#32-gameplay)
  - [Game Completion](#33-game-completion)
  - [Game Reset](#34-game-reset)
- [Serverless Computing](#-serverless-computing)
- [Conclusion](#-conclusion)

## **📌 Introduction**:
The City-Country Match Game is a card-matching game where players match cities to their corresponding countries. 🏙️🗺️ The game measures the time taken by the player to match all pairs and then ranks the player based on their performance.

## **📌 Project Structure**:
The game's codebase is organized into folders for clarity:
- **Cloudflare Worker**: Contains the code for the Cloudflare worker, which acts as a bridge between the frontend and the Google Apps Script.
- **Google Apps Script**: Houses the Google Apps Script code that interacts with Google Sheets and calculates player rankings.
- **urls.js**: A file (not included in version control for security reasons) that exports the URLs for the Cloudflare Worker. This file is imported where the URL is needed.

## **Using ES6 Modules 📦**

The game's main script (`script.js`) is loaded as an ES6 module. This allows for the use of modern JavaScript features like the `import` and `export` statements. When including the script in your HTML, ensure that you specify the type as `module`:


`<script src="script.js" type="module"></script>´

This tells the browser to treat `script.js` as an ES6 module. 

**Note:** ES6 modules are widely supported in modern browsers, but they might not work in older versions or some browsers. Always ensure compatibility based on your target audience.

## **Setting Up URLs 🌐**:

### **Cloudflare Worker URL**:

To set up the Cloudflare Worker URL:

1. Create a file named `urls.js` in the root directory of your project.
2. Inside this file, add the following content:

´´´javascript
export const CLOUDFLARE_WORKER_URL = 'YOUR_CLOUDFLARE_WORKER_URL_HERE';
´´´	

Replace `'YOUR_CLOUDFLARE_WORKER_URL_HERE'` with your actual Cloudflare Worker URL.

### **Google Apps Script URL**:

For the Google Apps Script (GAS) URL, you'll need to manually replace the placeholder in the Cloudflare Worker code with your GAS web app URL. This is because the Cloudflare Worker cannot import from local directories.

### **Security Note 🔒**:

If you plan to make your repository public, remember to add the `urls.js` file to your `.gitignore` to prevent your Cloudflare Worker URL (and any other sensitive URLs or keys) from being exposed. This is crucial for security reasons.

## **1. 🖥️ Frontend Components**:

### **1.1 HTML**:
The game's structure is defined in the HTML. Key components include:
- **Intro Modal**: 🎉 Introduces the game to the user.
- **Game Container**: 🎮 Houses the timer and game board.
- **Win Modal**: 🏆 Displays upon game completion, showing the player's rank and time.

### **1.2 CSS**:
The stylesheet 🎨 defines the game's appearance. It ensures responsiveness, adjusts layout based on screen width, and provides animations for card interactions.

### **1.3 JavaScript**:
The game's logic is implemented in JavaScript. Key functionalities include:
- **Card Generation**: 🃏 Dynamically creates cards based on city-country pairs.
- **Card Flipping**: 🔄 Allows players to flip cards and reveal their content.
- **Matching Logic**: ✅ Determines if two flipped cards are a match.
- **Timer**: ⏲️ Tracks the player's game duration.
- **Ranking**: 📊 Sends the player's time to a backend service to determine their rank.

## **2. ⚙️ Backend Components**:

### **2.1 Cloudflare Worker**:
The Cloudflare worker acts as a middleman between the frontend and the Google Apps Script (GAS). It handles CORS issues and forwards requests to the GAS, ensuring seamless communication.

### **2.2 Google Apps Script (GAS)**:
The GAS serves two main purposes:
- **Data Storage**: 📝 Saves the player's time to a Google Sheet.
- **Rank Calculation**: 🧮 Determines the player's rank based on their time and the times of previous players.

## **3. 🎲 Game Flow**:

### **3.1 Initialization**:
Upon page load, the game:
- Displays the intro modal.
- Generates and shuffles cards.
- Adjusts the game board layout.
- Attaches event listeners to cards for interactivity.

### **3.2 Gameplay**:
Players flip cards to find matching city-country pairs. The game tracks the number of matched pairs and the elapsed time, ensuring a competitive environment.

### **3.3 Game Completion**:
Once all pairs are matched:
- The timer stops.
- The player's time is sent to the Cloudflare worker.
- The worker forwards the time to the GAS.
- The GAS saves the time, calculates the rank, and returns a ranking message.
- The game displays the rank and time in the win modal, celebrating the player's achievement.

### **3.4 Game Reset**:
Players can restart the game, which:
- Clears dynamically generated content.
- Reinitializes the game, offering a fresh start.

## **4. ☁️ Serverless Computing**:
The game leverages the principles of serverless computing. Instead of maintaining a dedicated backend server, it uses a Cloudflare worker and a Google Apps Script. This approach offers several benefits:
- **Scalability**: 📈 Automatically scales based on demand.
- **Cost-Efficiency**: 💰 Only pay for the actual compute time used.
- **Maintenance**: 🛠️ Reduced operational overhead as there's no server to manage.
- **Performance**: ⚡ Reduced latency as serverless functions can run close to the user.

## **5. 🎉 Conclusion**:
The City-Country Match Game is a comprehensive example of combining frontend interactivity with serverless backend logic. It showcases how modern web development can create engaging user experiences without the need for traditional server infrastructure.

---

For developers looking to recreate or adapt this game, understanding each component's role and the overall flow is crucial. The game's modular design also allows for easy expansion, such as adding more city-country pairs or integrating other serverless services.
