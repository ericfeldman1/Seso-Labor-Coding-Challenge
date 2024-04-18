"use strict";

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  logSources.sort((a, b) => a.last.date - b.last.date);
  return console.log(logSources[0]);
};
