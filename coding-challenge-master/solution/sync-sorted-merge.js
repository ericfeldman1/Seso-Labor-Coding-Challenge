"use strict";

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  logSources.sort((a, b) => a.last.date - b.last.date);

  // return console.log(logSources), printer.done();

  return console.log(logSources);

  // for (let i = 0; i < 3; i++) {
  //   return console.log(logSources[0].pop());
  // }
};
