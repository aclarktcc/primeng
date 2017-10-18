"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var TreeDragDropService = (function () {
    function TreeDragDropService() {
        this.dragStartSource = new Subject_1.Subject();
        this.dragStopSource = new Subject_1.Subject();
        this.dragStart$ = this.dragStartSource.asObservable();
        this.dragStop$ = this.dragStopSource.asObservable();
    }
    TreeDragDropService.prototype.startDrag = function (event) {
        this.dragStartSource.next(event);
    };
    TreeDragDropService.prototype.stopDrag = function (event) {
        this.dragStopSource.next(event);
    };
    return TreeDragDropService;
}());
TreeDragDropService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
TreeDragDropService.ctorParameters = function () { return []; };
exports.TreeDragDropService = TreeDragDropService;
//# sourceMappingURL=treedragdropservice.js.map