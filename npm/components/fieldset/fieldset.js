"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var common_1 = require("@angular/common");
var shared_1 = require("../common/shared");
var Fieldset = (function () {
    function Fieldset(el) {
        this.el = el;
        this.collapsed = false;
        this.onBeforeToggle = new core_1.EventEmitter();
        this.onAfterToggle = new core_1.EventEmitter();
    }
    Fieldset.prototype.toggle = function (event) {
        if (this.toggleable) {
            if (this.animating) {
                return false;
            }
            this.animating = true;
            this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });
            if (this.collapsed)
                this.expand(event);
            else
                this.collapse(event);
            this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        }
    };
    Fieldset.prototype.expand = function (event) {
        this.collapsed = false;
    };
    Fieldset.prototype.collapse = function (event) {
        this.collapsed = true;
    };
    Fieldset.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    Fieldset.prototype.onToggleDone = function (event) {
        this.animating = false;
    };
    return Fieldset;
}());
Fieldset.decorators = [
    { type: core_1.Component, args: [{
                selector: 'p-fieldset',
                template: "\n        <fieldset [ngClass]=\"{'ui-fieldset ui-widget ui-widget-content ui-corner-all': true, 'ui-fieldset-toggleable': toggleable}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <legend class=\"ui-fieldset-legend ui-corner-all ui-state-default ui-unselectable-text\" (click)=\"toggle($event)\">\n                <span *ngIf=\"toggleable\" class=\"ui-fieldset-toggler fa fa-w\" [ngClass]=\"{'fa-minus': !collapsed,'fa-plus':collapsed}\"></span>\n                {{legend}}\n                <ng-content select=\"p-header\"></ng-content>\n            </legend>\n            <div class=\"ui-fieldset-content-wrapper\" [@fieldsetContent]=\"collapsed ? 'hidden' : 'visible'\" \n                        [ngClass]=\"{'ui-fieldset-content-wrapper-overflown': collapsed||animating}\"\n                         (@fieldsetContent.done)=\"onToggleDone($event)\">\n                <div class=\"ui-fieldset-content\">\n                    <ng-content></ng-content>\n                </div>\n            </div>\n        </fieldset>\n    ",
                animations: [
                    animations_1.trigger('fieldsetContent', [
                        animations_1.state('hidden', animations_1.style({
                            height: '0px'
                        })),
                        animations_1.state('visible', animations_1.style({
                            height: '*'
                        })),
                        animations_1.transition('visible => hidden', animations_1.animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
                        animations_1.transition('hidden => visible', animations_1.animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
                    ])
                ]
            },] },
];
/** @nocollapse */
Fieldset.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
]; };
Fieldset.propDecorators = {
    'legend': [{ type: core_1.Input },],
    'toggleable': [{ type: core_1.Input },],
    'collapsed': [{ type: core_1.Input },],
    'onBeforeToggle': [{ type: core_1.Output },],
    'onAfterToggle': [{ type: core_1.Output },],
    'style': [{ type: core_1.Input },],
    'styleClass': [{ type: core_1.Input },],
};
exports.Fieldset = Fieldset;
var FieldsetModule = (function () {
    function FieldsetModule() {
    }
    return FieldsetModule;
}());
FieldsetModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                exports: [Fieldset, shared_1.SharedModule],
                declarations: [Fieldset]
            },] },
];
/** @nocollapse */
FieldsetModule.ctorParameters = function () { return []; };
exports.FieldsetModule = FieldsetModule;
//# sourceMappingURL=fieldset.js.map