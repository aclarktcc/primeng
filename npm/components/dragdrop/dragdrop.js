"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var domhandler_1 = require("../dom/domhandler");
var Draggable = (function () {
    function Draggable(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.onDragStart = new core_1.EventEmitter();
        this.onDragEnd = new core_1.EventEmitter();
        this.onDrag = new core_1.EventEmitter();
    }
    Draggable.prototype.dragStart = function (event) {
        if (this.allowDrag()) {
            if (this.dragEffect) {
                event.dataTransfer.effectAllowed = this.dragEffect;
            }
            event.dataTransfer.setData('text', this.scope);
            this.onDragStart.emit(event);
        }
        else {
            event.preventDefault();
        }
    };
    Draggable.prototype.drag = function (event) {
        this.onDrag.emit(event);
    };
    Draggable.prototype.dragEnd = function (event) {
        this.onDragEnd.emit(event);
    };
    Draggable.prototype.mouseover = function (event) {
        this.handle = event.target;
    };
    Draggable.prototype.mouseleave = function (event) {
        this.handle = null;
    };
    Draggable.prototype.allowDrag = function () {
        if (this.dragHandle && this.handle)
            return this.domHandler.matches(this.handle, this.dragHandle);
        else
            return true;
    };
    return Draggable;
}());
Draggable.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[pDraggable]',
                host: {
                    '[draggable]': 'true'
                },
                providers: [domhandler_1.DomHandler]
            },] },
];
/** @nocollapse */
Draggable.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: domhandler_1.DomHandler, },
]; };
Draggable.propDecorators = {
    'scope': [{ type: core_1.Input, args: ['pDraggable',] },],
    'dragEffect': [{ type: core_1.Input },],
    'dragHandle': [{ type: core_1.Input },],
    'onDragStart': [{ type: core_1.Output },],
    'onDragEnd': [{ type: core_1.Output },],
    'onDrag': [{ type: core_1.Output },],
    'dragStart': [{ type: core_1.HostListener, args: ['dragstart', ['$event'],] },],
    'drag': [{ type: core_1.HostListener, args: ['drag', ['$event'],] },],
    'dragEnd': [{ type: core_1.HostListener, args: ['dragend', ['$event'],] },],
    'mouseover': [{ type: core_1.HostListener, args: ['mouseover', ['$event'],] },],
    'mouseleave': [{ type: core_1.HostListener, args: ['mouseleave', ['$event'],] },],
};
exports.Draggable = Draggable;
var Droppable = (function () {
    function Droppable(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.onDragEnter = new core_1.EventEmitter();
        this.onDragLeave = new core_1.EventEmitter();
        this.onDrop = new core_1.EventEmitter();
        this.onDragOver = new core_1.EventEmitter();
    }
    Droppable.prototype.drop = function (event) {
        if (this.allowDrop(event)) {
            event.preventDefault();
            this.onDrop.emit(event);
        }
    };
    Droppable.prototype.dragEnter = function (event) {
        event.preventDefault();
        if (this.dropEffect) {
            event.dataTransfer.dropEffect = this.dropEffect;
        }
        this.onDragEnter.emit(event);
    };
    Droppable.prototype.dragLeave = function (event) {
        event.preventDefault();
        this.onDragLeave.emit(event);
    };
    Droppable.prototype.dragOver = function (event) {
        event.preventDefault();
        this.onDragOver.emit(event);
    };
    Droppable.prototype.allowDrop = function (event) {
        var dragScope = event.dataTransfer.getData('text');
        if (typeof (this.scope) == "string" && dragScope == this.scope) {
            return true;
        }
        else if (this.scope instanceof Array) {
            for (var j = 0; j < this.scope.length; j++) {
                if (dragScope == this.scope[j]) {
                    return true;
                }
            }
        }
        return false;
    };
    return Droppable;
}());
Droppable.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[pDroppable]',
                providers: [domhandler_1.DomHandler]
            },] },
];
/** @nocollapse */
Droppable.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: domhandler_1.DomHandler, },
]; };
Droppable.propDecorators = {
    'scope': [{ type: core_1.Input, args: ['pDroppable',] },],
    'dropEffect': [{ type: core_1.Input },],
    'onDragEnter': [{ type: core_1.Output },],
    'onDragLeave': [{ type: core_1.Output },],
    'onDrop': [{ type: core_1.Output },],
    'onDragOver': [{ type: core_1.Output },],
    'drop': [{ type: core_1.HostListener, args: ['drop', ['$event'],] },],
    'dragEnter': [{ type: core_1.HostListener, args: ['dragenter', ['$event'],] },],
    'dragLeave': [{ type: core_1.HostListener, args: ['dragleave', ['$event'],] },],
    'dragOver': [{ type: core_1.HostListener, args: ['dragover', ['$event'],] },],
};
exports.Droppable = Droppable;
var DragDropModule = (function () {
    function DragDropModule() {
    }
    return DragDropModule;
}());
DragDropModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                exports: [Draggable, Droppable],
                declarations: [Draggable, Droppable]
            },] },
];
/** @nocollapse */
DragDropModule.ctorParameters = function () { return []; };
exports.DragDropModule = DragDropModule;
//# sourceMappingURL=dragdrop.js.map