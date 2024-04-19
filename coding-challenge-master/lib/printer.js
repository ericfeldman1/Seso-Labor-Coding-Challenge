"use strict";

const _ = require("lodash");

module.exports = class Printer {
  //  Creating and initializing object instance of LogSource class
  constructor() {
    // Value for "last" key
    this.last = new Date(0);
    // Value for "logsPrinted" key
    this.logsPrinted = 0;
  }

  // print() function that takes one parameter
  print(log) {
    // Display error if date value isn't an actual date
    if (!_.isDate(log.date)) {
      throw new Error(log.date + " is not a date");
    }
    // Display different error if not chronological
    if (log.date >= this.last) {
      console.log(log.date, log.msg);
    } else {
      throw new Error(log.date + " is not greater than " + this.last);
    }
    // Set last key equal to date value
    this.last = log.date;
    // Iteerate logsPrinted by 1
    this.logsPrinted++;
    // If value of logsPrinted is 1, set "startTime" equal to the current time
    if (this.logsPrinted === 1) {
      this.startTime = new Date();
    }
  }

  // done() function
  done() {
    // Establish a timeTaken variable that finds the time from the initial startTime until "now"
    var timeTaken = (new Date() - this.startTime) / 1000;
    console.log("\n***********************************");
    // Print the number of logs printed
    console.log("Logs printed:\t\t", this.logsPrinted);
    // Print the time taken
    console.log("Time taken (s):\t\t", timeTaken);
    console.log("Logs/s:\t\t\t", this.logsPrinted / timeTaken);
    console.log("***********************************\n");
  }
};
