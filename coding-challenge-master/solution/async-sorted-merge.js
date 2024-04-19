"use strict";

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  logSources.sort((a, b) => a.last.date - b.last.date);
  return new Promise((resolve, reject) => {
    resolve(console.log(logSources));
  });
};
