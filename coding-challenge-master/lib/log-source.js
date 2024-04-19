"use strict";

const _ = require("lodash");
const Faker = require("Faker");
const P = require("bluebird");

/*
    We don't like OOP - in fact - we despise it!

    However, most real world implementations of something like a log source
    will be in OO form - therefore - we simulate that interaction here.
*/

module.exports = class LogSource {
  // Creating and initializing object instance of LogSource class
  constructor() {
    // Value for "drained" key
    this.drained = false;
    // Value for "last" key
    this.last = {
      // Value for "date" key
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * _.random(40, 60)),
      // Value for "msg" key
      msg: Faker.Company.catchPhrase(),
    };
  }

  // Function to generate an object within the "last" key
  getNextPseudoRandomEntry() {
    return {
      // Generates a random date for the "date" key
      date: new Date(
        this.last.date.getTime() +
          1000 * 60 * 60 * _.random(10) +
          _.random(1000 * 60)
      ),
      // Generates a random message for the "msg" key
      msg: Faker.Company.catchPhrase(),
    };
  }

  // Function to be used on sync entries
  pop() {
    // Sets value of "last" key to random values generated from getNextPsuedoRandomEntry function
    this.last = this.getNextPseudoRandomEntry();

    // If randomly generated last.date value is more recent than the current timestamp, set the drained key to true
    if (this.last.date > new Date()) {
      this.drained = true;
    }
    // If drained is true, then don't run the pop() function;
    // otherwise, if drained is false, return the value of the "last" object
    return this.drained ? false : this.last;
  }

  // Function to be used on the async entries
  popAsync() {
    // Sets value of "last" key to random values generated from getNextPsuedoRandomEntry function
    this.last = this.getNextPseudoRandomEntry();
    if (this.last.date > Date.now()) {
      this.drained = true;
    }
    // If drained is true, then don't run the pop() function;
    // otherwise, if drained is false, return the value of the "last" object
    // **CAVEAT HERE: This is returned on a random delay, making it async
    return P.delay(_.random(8)).then(() => (this.drained ? false : this.last));
  }
};
