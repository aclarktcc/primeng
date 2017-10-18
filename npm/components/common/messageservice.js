"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var MessageService = (function () {
    function MessageService() {
        this.messageSource = new Subject_1.Subject();
        this.messageObserver = this.messageSource.asObservable();
    }
    MessageService.prototype.add = function (message) {
        if (message) {
            this.messageSource.next(message);
        }
    };
    MessageService.prototype.addAll = function (messages) {
        if (messages && messages.length) {
            this.messageSource.next(messages);
        }
    };
    MessageService.prototype.clear = function () {
        this.messageSource.next(null);
    };
    return MessageService;
}());
MessageService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
MessageService.ctorParameters = function () { return []; };
exports.MessageService = MessageService;
//# sourceMappingURL=messageservice.js.map