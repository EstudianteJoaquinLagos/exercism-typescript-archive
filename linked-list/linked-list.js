"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LinkedList_head, _LinkedList_tail, _LinkedList_length;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
/** A double linked node */
var Node = /** @class */ (function () {
    function Node(value) {
        this.next = null;
        this.prev = null;
        this.value = value;
    }
    return Node;
}());
/** A double linked list */
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        // Nodes that LinkedList wraps
        _LinkedList_head.set(this, void 0); // first node of the list
        _LinkedList_tail.set(this, void 0); // last node of the list
        _LinkedList_length.set(this, void 0); // The length of the list in nodes
        __classPrivateFieldSet(this, _LinkedList_head, null, "f");
        __classPrivateFieldSet(this, _LinkedList_tail, null, "f");
        __classPrivateFieldSet(this, _LinkedList_length, 0, "f");
    }
    /** Add an element to the end of the list */
    LinkedList.prototype.push = function (element) {
        var _a, _b;
        // First node is tracked both by tail and head
        if (!__classPrivateFieldGet(this, _LinkedList_tail, "f")) {
            __classPrivateFieldSet(this, _LinkedList_head, new Node(element), "f");
            __classPrivateFieldSet(this, _LinkedList_tail, __classPrivateFieldGet(this, _LinkedList_head, "f"), "f");
            __classPrivateFieldSet(this, _LinkedList_length, (_a = __classPrivateFieldGet(this, _LinkedList_length, "f"), _a++, _a), "f");
        }
        else {
            // Take last tracked node in the list
            var lastTail = __classPrivateFieldGet(this, _LinkedList_tail, "f");
            // Link last node with new element's node, both ways
            lastTail.next = new Node(element);
            lastTail.next.prev = lastTail;
            __classPrivateFieldSet(this, _LinkedList_length, (_b = __classPrivateFieldGet(this, _LinkedList_length, "f"), _b++, _b), "f");
            // Track new tail of the linked list
            __classPrivateFieldSet(this, _LinkedList_tail, lastTail.next, "f");
        }
    };
    /** Delete an element from the end of the list and return it */
    LinkedList.prototype.pop = function () {
        var _a, _b;
        // Must throw an error when list is empty
        if (!__classPrivateFieldGet(this, _LinkedList_tail, "f")) {
            throw new Error('Linked list is empty!');
        }
        // Take last tracked node in the list
        var lastTail = __classPrivateFieldGet(this, _LinkedList_tail, "f");
        // When only one node remains
        if (!lastTail.prev) {
            __classPrivateFieldSet(this, _LinkedList_head, null, "f"); // delete it from
            __classPrivateFieldSet(this, _LinkedList_tail, null, "f"); // both trackers
            __classPrivateFieldSet(this, _LinkedList_length, // both trackers
            (_a = __classPrivateFieldGet(this, _LinkedList_length, "f"), _a--, _a), "f");
            return lastTail.value;
        }
        else {
            // delete next link from previous node
            lastTail.prev.next = null;
            __classPrivateFieldSet(this, _LinkedList_length, (_b = __classPrivateFieldGet(this, _LinkedList_length, "f"), _b--, _b), "f");
            // move tracked last node to previous node
            __classPrivateFieldSet(this, _LinkedList_tail, lastTail.prev, "f");
            return lastTail.value;
        }
    };
    /** Add an element to the start of the list */
    LinkedList.prototype.shift = function () {
        var _a, _b;
        // Must throw an error when list is empty
        if (!__classPrivateFieldGet(this, _LinkedList_head, "f")) {
            throw new Error('Linked list is empty!');
        }
        // Take first tracked node in the list
        var lastHead = __classPrivateFieldGet(this, _LinkedList_head, "f");
        // When only one node remains
        if (!lastHead.next) {
            __classPrivateFieldSet(this, _LinkedList_head, null, "f"); // delete it from
            __classPrivateFieldSet(this, _LinkedList_tail, null, "f"); // both trackers
            __classPrivateFieldSet(this, _LinkedList_length, // both trackers
            (_a = __classPrivateFieldGet(this, _LinkedList_length, "f"), _a--, _a), "f");
            return lastHead.value;
        }
        else {
            // delete next link from previous node
            lastHead.next.prev = null;
            __classPrivateFieldSet(this, _LinkedList_length, (_b = __classPrivateFieldGet(this, _LinkedList_length, "f"), _b--, _b), "f");
            // move tracked last node to previous node
            __classPrivateFieldSet(this, _LinkedList_head, lastHead.next, "f");
            return lastHead.value;
        }
    };
    /** Delete an element from the start of the list and return it */
    LinkedList.prototype.unshift = function (element) {
        var _a, _b;
        // First node is tracked both by head and tail
        if (!__classPrivateFieldGet(this, _LinkedList_head, "f")) {
            __classPrivateFieldSet(this, _LinkedList_head, new Node(element), "f");
            __classPrivateFieldSet(this, _LinkedList_tail, __classPrivateFieldGet(this, _LinkedList_head, "f"), "f");
            __classPrivateFieldSet(this, _LinkedList_length, (_a = __classPrivateFieldGet(this, _LinkedList_length, "f"), _a++, _a), "f");
        }
        else {
            // Take first tracked node in the list
            var lastHead = __classPrivateFieldGet(this, _LinkedList_head, "f");
            // Link first node with new element's node, both ways
            lastHead.prev = new Node(element);
            lastHead.prev.next = lastHead;
            __classPrivateFieldSet(this, _LinkedList_length, (_b = __classPrivateFieldGet(this, _LinkedList_length, "f"), _b++, _b), "f");
            // Track new head of the linked list
            __classPrivateFieldSet(this, _LinkedList_head, lastHead.prev, "f");
        }
    };
    /** Delete the first intance of a given element from the list */
    LinkedList.prototype.delete = function (element) {
        var _a, _b, _c, _d;
        // No elements in list, fail
        if (!__classPrivateFieldGet(this, _LinkedList_head, "f")) {
            throw new Error('No elements in the list');
        }
        // Only one element on the list
        if (!__classPrivateFieldGet(this, _LinkedList_head, "f").next) {
            // and is the given
            if (__classPrivateFieldGet(this, _LinkedList_head, "f").value === element) {
                // delete it from both head and tails
                __classPrivateFieldSet(this, _LinkedList_head, null, "f");
                __classPrivateFieldSet(this, _LinkedList_tail, null, "f");
                __classPrivateFieldSet(this, _LinkedList_length, (_a = __classPrivateFieldGet(this, _LinkedList_length, "f"), _a--, _a), "f");
            }
            return;
        }
        // Head matches element
        if (__classPrivateFieldGet(this, _LinkedList_head, "f").value === element) {
            __classPrivateFieldGet(this, _LinkedList_head, "f").next.prev = null; // delete head
            __classPrivateFieldSet(this, _LinkedList_head, __classPrivateFieldGet(this, _LinkedList_head, "f").next, "f"); // and track new one
            __classPrivateFieldSet(this, _LinkedList_length, // and track new one
            (_b = __classPrivateFieldGet(this, _LinkedList_length, "f"), _b--, _b), "f");
            return;
        }
        // Tail matches element
        if (__classPrivateFieldGet(this, _LinkedList_tail, "f").value === element) {
            __classPrivateFieldGet(this, _LinkedList_tail, "f").prev.next = null; // delete tail
            __classPrivateFieldSet(this, _LinkedList_tail, __classPrivateFieldGet(this, _LinkedList_tail, "f").prev, "f"); // and track new one
            __classPrivateFieldSet(this, _LinkedList_length, // and track new one
            (_c = __classPrivateFieldGet(this, _LinkedList_length, "f"), _c--, _c), "f");
            return;
        }
        var node = __classPrivateFieldGet(this, _LinkedList_head, "f").next;
        // For all other elements in between head and tail
        while (node.prev && node.next) {
            if (node.value === element) { // when a match is found
                node.prev.next = node.next; // connect prev node with next
                node.next.prev = node.prev; // connect next node with prev
                __classPrivateFieldSet(this, _LinkedList_length, // connect next node with prev
                (_d = __classPrivateFieldGet(this, _LinkedList_length, "f"), _d--, _d), "f");
                return;
            }
            node = node.next;
        }
        return; // Match is not found
    };
    LinkedList.prototype.count = function () {
        return __classPrivateFieldGet(this, _LinkedList_length, "f");
    };
    return LinkedList;
}());
exports.LinkedList = LinkedList;
_LinkedList_head = new WeakMap(), _LinkedList_tail = new WeakMap(), _LinkedList_length = new WeakMap();
