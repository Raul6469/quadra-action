import { CheckResults } from "quadra/dist/types/check-result.interface";
const _ = require('lodash');

/**
 * 
 * @param {CheckResults} results 
 */
function getConclusion (results) {
  const failed = _.flatten(_.values(results)).filter(r => r.level >= 2).length;

  if (failed === 0) {
    return 'success';
  }
  return 'failure';
}

module.exports = getConclusion;
