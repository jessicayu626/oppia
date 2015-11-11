// Copyright 2014 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Factory for handling warnings.
 *
 * @author sll@google.com (Sean Lip)
 */

oppia.factory('warningsData', ['$log', function($log) {
  var warningsData = {warnings: []};
  // This is to prevent infinite loops.
  var MAX_TOTAL_WARNINGS = 100;
  var warningsSoFar = 0;

  /**
   * Adds a warning message to the butterbar.
   * @param {string} warning The warning message to display.
   */
  warningsData.addWarning = function(warning) {
    $log.error(warning);
    warningsSoFar++;
    if (warningsSoFar > MAX_TOTAL_WARNINGS) {
      return;
    }

    warningsData.warnings = [warning];
  };

  /**
   * Adds a warning in the same way as addWarning(), except it also throws an
   * exception to cause a hard failure in the frontend.
   *
   * TODO(bhenning): This should display some sort of 'Oops' error page to avoid
   * the frontend going into an undefined state.
   */
  warningsData.fatalWarning = function(warning) {
    warningsData.addWarning(warning);
    throw new Error(warning);
  };

  /**
   * Deletes the warning at a given index.
   * @param {int} index The index of the warning to delete.
   */
  warningsData.deleteWarning = function(index) {
    warningsData.warnings.splice(index, 1);
  };

  /**
   * Clears all warnings.
   */
  warningsData.clear = function() {
    warningsData.warnings = [];
  };

  return warningsData;
}]);
