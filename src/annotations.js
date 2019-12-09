import { CheckResults } from "quadra/dist/types/check-result.interface";
const _ = require('lodash');

/**
 * 
 * @param {CheckResults} results
 */
function getAnnotations (results) {
  const annotations = [];
  _.forEach(results, (boxResults) => {
    _.forEach(boxResults, result => {
      annotations.push({
        path: result.source,
        start_line: result.dependency.location.start.line,
        start_column: result.dependency.location.start.column,
        end_line: result.dependency.location.end.line,
        end_column: result.dependency.location.end.column,
        annotation_level: result.level > 1 ? 'warning' : 'failure',
        title: 'Invalid dependency',
        message: result.message,
      });
    });
  });
  return annotations;
}

module.exports = getAnnotations;
