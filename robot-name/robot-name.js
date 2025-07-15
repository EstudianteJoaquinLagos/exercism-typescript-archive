"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Robot = void 0;
var Robot = /** @class */ (function () {
    function Robot() {
        this._name = null;
    }
    Object.defineProperty(Robot.prototype, "name", {
        get: function () {
            /* Return the instance stored _name, else produce a random name and return it */
            if (this._name) {
                return this._name;
            } // Short circuit
            var randomName = Robot.nameBank.next().value;
            if (!randomName) {
                throw new Error('Unable to generate a new name: name bank is empty. Relese names and try again');
            }
            this._name = randomName;
            return randomName;
        },
        enumerable: false,
        configurable: true
    });
    Robot.generateAllNames = function () {
        var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var numberRange = Array.from({ length: 1000 }).fill(0).map(function (_, i) { return i; });
        var allNames = [];
        for (var _i = 0, alphabet_1 = alphabet; _i < alphabet_1.length; _i++) {
            var firstChar = alphabet_1[_i];
            for (var _a = 0, alphabet_2 = alphabet; _a < alphabet_2.length; _a++) {
                var secondChar = alphabet_2[_a];
                for (var _b = 0, numberRange_1 = numberRange; _b < numberRange_1.length; _b++) {
                    var number = numberRange_1[_b];
                    allNames.push("".concat(firstChar).concat(secondChar).concat(number.toString().padStart(3, '0')));
                }
            }
        }
        return allNames;
    };
    Robot.prototype.resetName = function () {
        this._name = null; // Necessary to disable short circuit of the getter associated to name
        this._name = this.name;
    };
    Robot.releaseNames = function () {
        Robot.nameBank = Robot.sortedNames.values();
    };
    Robot.allNames = Robot.generateAllNames();
    Robot.sortedNames = Robot.allNames.sort(function () { return Math.round(Math.random() - Math.random()); });
    Robot.nameBank = Robot.sortedNames.values();
    return Robot;
}());
exports.Robot = Robot;
