# City-Country Match Game Overview

## 1. **Overview**:
The application is a card-matching game where players match cities to their corresponding countries. The game measures the time taken by the player to match all pairs, and then ranks the player based on their performance.

## 2. **HTML Structure**:
- **Intro Modal**: This modal introduces the game to the user.
- **Game Container**: This is the main area where the game takes place. It contains a timer and a board where the cards are displayed.
- **Win Modal**: This modal appears when the user wins the game. It displays a spinner (while waiting for the rank), the player's time, and their rank.

## 3. **CSS**:
The CSS provides the styling for the game. It ensures that the game is responsive, adjusting the layout and size of elements based on the screen width. It also provides animations for card flipping and other interactions.

## 4. **JavaScript (Game Logic)**:
- **Initialization**: When the page loads (`DOMContentLoaded`), the game initializes by showing the intro modal, generating the cards, shuffling them, adjusting the layout, and attaching event listeners to the cards.
  
- **Card Generation**: The game cards are generated based on predefined city-country pairs. Each city and its corresponding country are treated as a matching pair.
  
- **Card Flipping**: Players can flip cards to reveal their content. If two cards are flipped, the game checks if they are a match.
  
- **Matching Logic**: If the flipped cards match (a city and its corresponding country), they remain revealed. If they don't match, they flip back after a short delay.
  
- **Timer**: A timer starts when the game begins, tracking how long the player takes to match all pairs.
  
- **Winning the Game**: Once all pairs are matched, the timer stops, and the win modal appears. The player's time is sent to a server to determine their rank.

## 5. **Cloudflare Worker**:
The worker acts as a proxy between the game and the Google Apps Script. When the game sends the player's time, the worker forwards this to the GAS. The GAS processes the time, saves it, calculates the rank, and sends back a ranking message. The worker then sends this response back to the game.

## 6. **Google Apps Script (GAS)**:
- **Data Saving**: The GAS saves the player's time to a Google Sheet.
  
- **Rank Calculation**: The GAS calculates the player's percentile rank based on their time and the times of previous players.
  
- **Response**: The GAS sends back a ranking message to the Cloudflare worker, which then forwards it to the game.

## 7. **Game End**:
After receiving the rank from the server, the game displays the player's time and rank in the win modal. The player can then choose to restart the game.

## 8. **Resetting the Game**:
If the player chooses to restart or if the page is refreshed, any dynamically generated content (like the spinner, time, and rank) is cleared, and the game is reinitialized.

---

In summary, this application is a timed card-matching game that ranks players based on their performance. It uses a combination of HTML, CSS, and JavaScript for the frontend, and a Cloudflare worker and Google Apps Script for the backend.
