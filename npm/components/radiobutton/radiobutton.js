"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
exports.RADIO_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return RadioButton; }),
    multi: true
};
var RadioButton = (function () {
    function RadioButton(cd) {
        this.cd = cd;
        this.onClick = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    RadioButton.prototype.handleClick = function () {
        if (!this.disabled) {
            this.select();
        }
    };
    RadioButton.prototype.select = function () {
        if (!this.disabled) {
            this.onClick.emit(null);
            this.inputViewChild.nativeElement.checked = true;
            this.checked = true;
            this.onModelChange(this.value);
        }
    };
    RadioButton.prototype.writeValue = function (value) {
        this.checked = (value == this.value);
        if (this.inputViewChild.nativeElement) {
            this.inputViewChild.nativeElement.checked = this.checked;
        }
        this.cd.markForCheck();
    };
    RadioButton.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    RadioButton.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    RadioButton.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    RadioButton.prototype.onFocus = function (event) {
        this.focused = true;
    };
    RadioButton.prototype.onBlur = function (event) {
        this.focused = false;
        this.onModelTouched();
    };
    RadioButton.prototype.onChange = function (event) {
        this.select();
    };
    return RadioButton;
}());
RadioButton.decorators = [
    { type: core_1.Component, args: [{
                selector: 'p-radioButton',
                template: "\n        <div [ngStyle]=\"style\" [ngClass]=\"'ui-radiobutton ui-widget'\" [class]=\"styleClass\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #rb type=\"radio\" [attr.id]=\"inputId\" [attr.name]=\"name\" [attr.value]=\"value\" [attr.tabindex]=\"tabindex\" \n                    [checked]=\"checked\" (change)=\"onChange($event)\" (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\">\n            </div>\n            <div (click)=\"handleClick()\"\n                [ngClass]=\"{'ui-radiobutton-box ui-widget ui-state-default':true,\n                'ui-state-active':rb.checked,'ui-state-disabled':disabled,'ui-state-focus':focused}\">\n                <span class=\"ui-radiobutton-icon ui-clickable\" [ngClass]=\"{'fa fa-circle':rb.checked}\"></span>\n            </div>\n        </div>\n        <label class=\"ui-radiobutton-label\" (click)=\"select()\" \n            [ngClass]=\"{'ui-label-active':rb.checked,'ui-label-disabled':disabled,'ui-label-focus':focused}\"\n            *ngIf=\"label\" [attr.for]=\"inputId\">{{label}}</label>\n    ",
                providers: [exports.RADIO_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
RadioButton.ctorParameters = function () { return [
    { type: core_1.ChangeDetectorRef, },
]; };
RadioButton.propDecorators = {
    'value': [{ type: core_1.Input },],
    'name': [{ type: core_1.Input },],
    'disabled': [{ type: core_1.Input },],
    'label': [{ type: core_1.Input },],
    'tabindex': [{ type: core_1.Input },],
    'inputId': [{ type: core_1.Input },],
    'style': [{ type: core_1.Input },],
    'styleClass': [{ type: core_1.Input },],
    'onClick': [{ type: core_1.Output },],
    'inputViewChild': [{ type: core_1.ViewChild, args: ['rb',] },],
};
exports.RadioButton = RadioButton;
var RadioButtonModule = (function () {
    function RadioButtonModule() {
    }
    return RadioButtonModule;
}());
RadioButtonModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                exports: [RadioButton],
                declarations: [RadioButton]
            },] },
];
/** @nocollapse */
RadioButtonModule.ctorParameters = function () { return []; };
exports.RadioButtonModule = RadioButtonModule;
//# sourceMappingURL=radiobutton.js.map