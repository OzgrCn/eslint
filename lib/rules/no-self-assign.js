/**
 * @fileoverview Disallow self assignment.
 * @author Özgür Can
 * @copyright 2014 Özgür Can. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
    return {

        "AssignmentExpression": function(node) {
            if (node.operator === "=" &&
                (node.left.type === "Identifier" && node.right.type === "Identifier" && node.left.name === node.right.name)) {
                context.report(node, "Self assignment is not allowed.");
            }
        }
    };

};

module.exports.schema = [];
