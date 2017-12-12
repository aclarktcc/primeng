"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var UIMessage = (function () {
    function UIMessage() {
    }
    Object.defineProperty(UIMessage.prototype, "icon", {
        get: function () {
            var icon = null;
            if (this.severity) {
                switch (this.severity) {
                    case 'success':
                        icon = 'fa fa-check';
                        break;
                    case 'info':
                        icon = 'fa fa-info-circle';
                        break;
                    case 'error':
                        icon = 'fa fa-close';
                        break;
                    case 'warn':
                        icon = 'fa fa-warning';
                        break;
                    default:
                        icon = 'fa fa-info-circle';
                        break;
                }
            }
            return icon;
        },
        enumerable: true,
        configurable: true
    });
    return UIMessage;
}());
UIMessage.decorators = [
    { type: core_1.Component, args: [{
                selector: 'p-message',
                template: "\n        <div aria-live=\"polite\" class=\"ui-message ui-widget ui-corner-all\" *ngIf=\"severity\"\n        [ngClass]=\"{'ui-messages-info': (severity === 'info'),\n                'ui-messages-warn': (severity === 'warn'),\n                'ui-messages-error': (severity === 'error'),\n                'ui-messages-success': (severity === 'success')}\">\n            <span class=\"ui-message-icon\" [ngClass]=\"icon\"></span>\n            <span class=\"ui-message-text\">{{text}}</span>\n        </div>\n    "
            },] },
];
/** @nocollapse */
UIMessage.ctorParameters = function () { return []; };
UIMessage.propDecorators = {
    'severity': [{ type: core_1.Input },],
    'text': [{ type: core_1.Input },],
};
exports.UIMessage = UIMessage;
var MessageModule = (function () {
    function MessageModule() {
    }
    return MessageModule;
}());
MessageModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                exports: [UIMessage],
                declarations: [UIMessage]
            },] },
];
/** @nocollapse */
MessageModule.ctorParameters = function () { return []; };
exports.MessageModule = MessageModule;
//# sourceMappingURL=message.js.map