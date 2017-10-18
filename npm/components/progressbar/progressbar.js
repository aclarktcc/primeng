"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ProgressBar = (function () {
    function ProgressBar() {
        this.showValue = true;
        this.unit = '%';
    }
    return ProgressBar;
}());
ProgressBar.decorators = [
    { type: core_1.Component, args: [{
                selector: 'p-progressBar',
                template: "\n        <div class=\"ui-progressbar ui-widget ui-widget-content ui-corner-all\" role=\"progressbar\" aria-valuemin=\"0\" [attr.aria-valuenow]=\"value\" aria-valuemax=\"100\">\n            <div class=\"ui-progressbar-value ui-progressbar-value-animate ui-widget-header ui-corner-all\" [style.width]=\"value + '%'\" style=\"display:block\"></div>\n            <div class=\"ui-progressbar-label\" [style.display]=\"value ? 'block' : 'none'\" *ngIf=\"showValue\">{{value}}{{unit}}</div>\n        </div>\n    "
            },] },
];
/** @nocollapse */
ProgressBar.ctorParameters = function () { return []; };
ProgressBar.propDecorators = {
    'value': [{ type: core_1.Input },],
    'showValue': [{ type: core_1.Input },],
    'unit': [{ type: core_1.Input },],
};
exports.ProgressBar = ProgressBar;
var ProgressBarModule = (function () {
    function ProgressBarModule() {
    }
    return ProgressBarModule;
}());
ProgressBarModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                exports: [ProgressBar],
                declarations: [ProgressBar]
            },] },
];
/** @nocollapse */
ProgressBarModule.ctorParameters = function () { return []; };
exports.ProgressBarModule = ProgressBarModule;
//# sourceMappingURL=progressbar.js.map