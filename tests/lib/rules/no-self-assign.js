/**
 * @fileoverview Tests for no-self-assign rule.
 * @author Özgür Can
 * @copyright 2014 Özgür Can. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-self-assign"),
    RuleTester = require("../../../lib/testers/rule-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-self-assign", rule, {
    valid: [
        "var a=10; alert(a);",
        "var a=10; a += a;",
        "function f(a) { alert(a); }",
        "function f(a) {a += a}",
        "function f() {}; ",
        { code: "let a = 1; alert(a);", ecmaFeatures: { blockBindings: true } },
        { code: "let a = function () {}; ", ecmaFeatures: { blockBindings: true } },
        { code: "(() => { var a = 2; alert(a); })();", ecmaFeatures: { arrowFunctions: true } },
        { code: "a(); { let a = function () {}; }", ecmaFeatures: { blockBindings: true } }
    ],

    invalid: [
        { code: "var a; a = a;", errors: [{ message: "Self assignment is not allowed.", type: "AssignmentExpression"}] },
        { code: "function a() {}; a = a;", errors: [{ message: "Self assignment is not allowed.", type: "AssignmentExpression"}] },
        { code: "function a(b) { b = b };", errors: [{ message: "Self assignment is not allowed.", type: "AssignmentExpression"}] },
        { code: "var a = function (b) { b = b};", errors: [{ message: "Self assignment is not allowed.", type: "AssignmentExpression" }] },
        { code: "{ let a = 2; a = a }", ecmaFeatures: { blockBindings: true }, errors: [{ message: "Self assignment is not allowed.", type: "AssignmentExpression"}] },
        { code: "var f = () => a; f = f;", ecmaFeatures: { arrowFunctions: true }, errors: [{ message: "Self assignment is not allowed.", type: "AssignmentExpression" }] },
        { code: "let f = () => a; f = f;", ecmaFeatures: { arrowFunctions: true, blockBindings: true }, errors: [{ message: "Self assignment is not allowed.", type: "AssignmentExpression" }] }
    ]
});

