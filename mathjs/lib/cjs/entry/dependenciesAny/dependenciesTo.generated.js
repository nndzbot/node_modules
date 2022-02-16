"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toDependencies = void 0;

var _dependenciesMatrixGenerated = require("./dependenciesMatrix.generated.js");

var _dependenciesTypedGenerated = require("./dependenciesTyped.generated.js");

var _factoriesAny = require("../../factoriesAny.js");

/**
 * THIS FILE IS AUTO-GENERATED
 * DON'T MAKE CHANGES HERE
 */
var toDependencies = {
  matrixDependencies: _dependenciesMatrixGenerated.matrixDependencies,
  typedDependencies: _dependenciesTypedGenerated.typedDependencies,
  createTo: _factoriesAny.createTo
};
exports.toDependencies = toDependencies;