/**
 * Handles POST requests.
 * @param {Object} e - The event object containing the request data.
 * @returns {Object} - The response object.
 */
function doPost(e) {
    try {
        // Parse the incoming JSON request body to extract data.
        var requestData = JSON.parse(e.postData.contents);
        
        // Get the active Google Sheet.
        var ss = SpreadsheetApp.getActiveSpreadsheet();
        
        // Determine the type of request and handle accordingly.
        if (requestData.type === 'saveTime') {
            // Access the 'Time' sheet.
            var timeSheet = ss.getSheetByName("Time");
            if (!timeSheet) throw new Error("Time sheet not found.");
    
            // Convert the provided time to seconds.
            var secondsValue = convertToSeconds(requestData.time);
    
            // Append the time in seconds to the 'Time' sheet.
            timeSheet.appendRow([secondsValue]);
    
            // Calculate the player's percentile based on the provided time.
            var times = timeSheet.getRange(2, 1, timeSheet.getLastRow() - 1).getValues().flat();
            var percentile = calculatePercentile(times, secondsValue);
            var rankingMessage = getRankingMessage(percentile);
    
            // Return a success response with the calculated percentile and ranking message.
            return ContentService.createTextOutput(JSON.stringify({ result: 'Success', percentile: percentile, message: rankingMessage }))
                .setMimeType(ContentService.MimeType.JSON);
        } else {
            // If the request type is not 'saveTime', throw an error.
            throw new Error("Invalid request type.");
        }
        
    } catch (error) {
        // Log any errors for debugging purposes.
        Logger.log(error.toString());
        
        // Return an error response.
        return ContentService.createTextOutput(JSON.stringify({ result: 'Error', message: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  /**
  * Calculates the percentile of a given value within a dataset.
  * @param {Array} data - The dataset.
  * @param {number} value - The value to calculate the percentile for.
  * @returns {number} - The calculated percentile.
  */
  function calculatePercentile(data, value) {
    var aboveOrEqual = data.filter(v => v >= value).length;
    var percentile = (aboveOrEqual / data.length) * 100;
    return Math.round(percentile * 10) / 10;
  }
  
  /**
  * Generates a ranking message based on the provided percentile.
  * @param {number} percentile - The player's percentile.
  * @returns {string} - The ranking message.
  */
  function getRankingMessage(percentile) {
    if (percentile >= 99) {
        return "Amazing! You're in the top 1% of players!";
    } else if (percentile >= 90) {
        return "Great job! You're in the top 10% of players!";
    } else if (percentile >= 80) {
        return "Well done! You're in the top 20% of players!";
    } else if (percentile >= 50) {
        return "Good effort! You're in the top half of players!";
    } else {
        return "Keep practicing! You can improve your rank!";
    }
  }
  
  /**
  * Converts a time string in the format "MM:SS" to seconds.
  * @param {string} time - The time string.
  * @returns {number} - The time in seconds.
  */
  function convertToSeconds(time) {
    var parts = time.split(":");
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  }