"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
exports.SELECTBUTTON_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return SelectButton; }),
    multi: true
};
var SelectButton = (function () {
    function SelectButton() {
        this.onOptionClick = new core_1.EventEmitter();
        this.onChange = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    SelectButton.prototype.writeValue = function (value) {
        this.value = value;
    };
    SelectButton.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    SelectButton.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    SelectButton.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    SelectButton.prototype.onItemClick = function (event, option, checkbox, index) {
        if (this.disabled) {
            return;
        }
        checkbox.focus();
        if (this.multiple) {
            var itemIndex_1 = this.findItemIndex(option);
            if (itemIndex_1 != -1)
                this.value = this.value.filter(function (val, i) { return i != itemIndex_1; });
            else
                this.value = (this.value || []).concat([option.value]);
        }
        else {
            this.value = option.value;
        }
        this.onOptionClick.emit({
            originalEvent: event,
            option: option,
            index: index
        });
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    };
    SelectButton.prototype.onFocus = function (event) {
        this.focusedItem = event.target;
    };
    SelectButton.prototype.onBlur = function (event) {
        this.focusedItem = null;
        this.onModelTouched();
    };
    SelectButton.prototype.isSelected = function (option) {
        if (this.multiple)
            return this.findItemIndex(option) != -1;
        else
            return option.value == this.value;
    };
    SelectButton.prototype.findItemIndex = function (option) {
        var index = -1;
        if (this.value) {
            for (var i = 0; i < this.value.length; i++) {
                if (this.value[i] == option.value) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    return SelectButton;
}());
SelectButton.decorators = [
    { type: core_1.Component, args: [{
                selector: 'p-selectButton',
                template: "\n        <div [ngClass]=\"'ui-selectbutton ui-buttonset ui-widget ui-corner-all ui-buttonset-' + options.length\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div *ngFor=\"let option of options; let i = index\" class=\"ui-button ui-widget ui-state-default ui-button-text-only {{option.styleClass}}\"\n                [ngClass]=\"{'ui-state-active':isSelected(option), 'ui-state-disabled':disabled, 'ui-state-focus': cbox == focusedItem}\" (click)=\"onItemClick($event,option,cbox,i)\">\n                <span class=\"ui-button-text ui-clickable\">{{option.label}}</span>\n                <div class=\"ui-helper-hidden-accessible\">\n                    <input #cbox type=\"checkbox\" [checked]=\"isSelected(option)\" (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\" [attr.tabindex]=\"tabindex\" [attr.disabled]=\"disabled\">\n                </div>\n            </div>\n        </div>\n    ",
                providers: [exports.SELECTBUTTON_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
SelectButton.ctorParameters = function () { return []; };
SelectButton.propDecorators = {
    'options': [{ type: core_1.Input },],
    'tabindex': [{ type: core_1.Input },],
    'multiple': [{ type: core_1.Input },],
    'style': [{ type: core_1.Input },],
    'styleClass': [{ type: core_1.Input },],
    'disabled': [{ type: core_1.Input },],
    'onOptionClick': [{ type: core_1.Output },],
    'onChange': [{ type: core_1.Output },],
};
exports.SelectButton = SelectButton;
var SelectButtonModule = (function () {
    function SelectButtonModule() {
    }
    return SelectButtonModule;
}());
SelectButtonModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                exports: [SelectButton],
                declarations: [SelectButton]
            },] },
];
/** @nocollapse */
SelectButtonModule.ctorParameters = function () { return []; };
exports.SelectButtonModule = SelectButtonModule;
//# sourceMappingURL=selectbutton.js.map