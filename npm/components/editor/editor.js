"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var shared_1 = require("../common/shared");
var domhandler_1 = require("../dom/domhandler");
var forms_1 = require("@angular/forms");
exports.EDITOR_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return Editor; }),
    multi: true
};
var Editor = (function () {
    function Editor(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.onTextChange = new core_1.EventEmitter();
        this.onSelectionChange = new core_1.EventEmitter();
        this.onInit = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    Editor.prototype.ngAfterViewInit = function () {
        var _this = this;
        var editorElement = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-editor-content');
        var toolbarElement = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-editor-toolbar');
        this.quill = new Quill(editorElement, {
            modules: {
                toolbar: toolbarElement
            },
            placeholder: this.placeholder,
            readOnly: this.readonly,
            theme: 'snow',
            formats: this.formats
        });
        if (this.value) {
            this.quill.pasteHTML(this.value);
        }
        this.quill.on('text-change', function (delta, oldContents, source) {
            var html = editorElement.children[0].innerHTML;
            var text = _this.quill.getText();
            if (html == '<p><br></p>') {
                html = null;
            }
            _this.onTextChange.emit({
                htmlValue: html,
                textValue: text,
                delta: delta,
                source: source
            });
            _this.onModelChange(html);
            if (source === 'user') {
                _this.onModelTouched();
            }
        });
        this.quill.on('selection-change', function (range, oldRange, source) {
            _this.onSelectionChange.emit({
                range: range,
                oldRange: oldRange,
                source: source
            });
        });
        this.onInit.emit({
            editor: this.quill
        });
    };
    Editor.prototype.writeValue = function (value) {
        this.value = value;
        if (this.quill) {
            if (value)
                this.quill.pasteHTML(value);
            else
                this.quill.setText('');
        }
    };
    Editor.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Editor.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Editor.prototype.getQuill = function () {
        return this.quill;
    };
    Object.defineProperty(Editor.prototype, "readonly", {
        get: function () {
            return this._readonly;
        },
        set: function (val) {
            this._readonly = val;
            if (this.quill) {
                if (this._readonly)
                    this.quill.disable();
                else
                    this.quill.enable();
            }
        },
        enumerable: true,
        configurable: true
    });
    return Editor;
}());
Editor.decorators = [
    { type: core_1.Component, args: [{
                selector: 'p-editor',
                template: "\n        <div [ngClass]=\"'ui-widget ui-editor-container ui-corner-all'\" [class]=\"styleClass\" attr.aria-label=\"This is a text editor that allows you to compose and style a body of text\">\n            <div class=\"ui-editor-toolbar ui-widget-header ui-corner-top\" *ngIf=\"toolbar\">\n                <ng-content select=\"p-header\"></ng-content>\n            </div>\n            <div class=\"ui-editor-toolbar ui-widget-header ui-corner-top\" *ngIf=\"!toolbar\" attr.aria-label=\"Editor Toolbar\">\n                <span class=\"ql-formats\">\n                    <select class=\"ql-header\" attr.aria-label=\"Select what type of text this is\" title=\"Select what type of text this is\">\n                      <option value=\"1\">Heading</option>\n                      <option value=\"2\">Subheading</option>\n                      <option selected>Normal</option>\n                    </select>\n                    <select class=\"ql-font\" attr.aria-label=\"Select font type to use\" title=\"Select font type to use\">\n                      <option selected>Sans Serif</option>\n                      <option value=\"serif\">Serif</option>\n                      <option value=\"monospace\">Monospace</option>\n                    </select>\n                </span>\n                <span class=\"ql-formats\" attr.aria-label=\"Choose which font style to use\">\n                    <button class=\"ql-bold\" aria-label=\"Bold\"></button>\n                    <button class=\"ql-italic\" aria-label=\"Italic\"></button>\n                    <button class=\"ql-underline\" aria-label=\"Underline\"></button>\n                </span>\n                <span class=\"ql-formats\" attr.aria-label=\"Select colors\">\n                    <select class=\"ql-color\" attr.aria-label=\"text color picker\" title=\"Text Color\"></select>\n                    <select class=\"ql-background\" attr.aria-label=\"background color picker\" title=\"Background Color\"></select>\n                </span>\n                <span class=\"ql-formats\" attr.aria-label=\"list types and alignment options\">\n                    <button class=\"ql-list\" value=\"ordered\" aria-label=\"Ordered List\" title=\"Ordered List\"></button>\n                    <button class=\"ql-list\" value=\"bullet\" aria-label=\"Unordered List\" title=\"Unordered List\"></button>\n                    <select class=\"ql-align\" attr.aria-label=\"Select text alignment\" title=\"Align Text\">\n                        <option selected attr.aria-label=\"Selected Alignment\"></option>\n                        <option value=\"center\" attr.aria-label=\"Align Center\" title=\"Align Center\"></option>\n                        <option value=\"right\" attr.aria-label=\"Align Right\" title=\"Align Right\"></option>\n                        <option value=\"justify\" attr.aria-label=\"Justify Text\" title=\"Justify Text\"></option>\n                    </select>\n                </span>\n                <span class=\"ql-formats\" attr.aria-label=\"types of insert buttons\">\n                    <button class=\"ql-link\" aria-label=\"Insert Link\" title=\"Insert Link\"></button>\n                    <button class=\"ql-image\" aria-label=\"Insert Image\" title=\"Insert Image\"></button>\n                    <button class=\"ql-code-block\" aria-label=\"Insert Code Block\" title=\"Insert Code Block\"></button>\n                </span>\n                <span class=\"ql-formats\">\n                    <button class=\"ql-clean\" aria-label=\"Remove Styles\" title=\"Remove Styles\"></button>\n                </span>\n            </div>\n            <div class=\"ui-editor-content\" [ngStyle]=\"style\" attr.aria-label=\"Main editor text body\"></div>\n        </div>\n    ",
                providers: [domhandler_1.DomHandler, exports.EDITOR_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
Editor.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: domhandler_1.DomHandler, },
]; };
Editor.propDecorators = {
    'onTextChange': [{ type: core_1.Output },],
    'onSelectionChange': [{ type: core_1.Output },],
    'toolbar': [{ type: core_1.ContentChild, args: [shared_1.Header,] },],
    'style': [{ type: core_1.Input },],
    'styleClass': [{ type: core_1.Input },],
    'placeholder': [{ type: core_1.Input },],
    'formats': [{ type: core_1.Input },],
    'onInit': [{ type: core_1.Output },],
    'readonly': [{ type: core_1.Input },],
};
exports.Editor = Editor;
var EditorModule = (function () {
    function EditorModule() {
    }
    return EditorModule;
}());
EditorModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                exports: [Editor, shared_1.SharedModule],
                declarations: [Editor]
            },] },
];
/** @nocollapse */
EditorModule.ctorParameters = function () { return []; };
exports.EditorModule = EditorModule;
//# sourceMappingURL=editor.js.map