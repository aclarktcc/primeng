"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var shared_1 = require("../common/shared");
var domhandler_1 = require("../dom/domhandler");
var DataScroller = (function () {
    function DataScroller(el, renderer, domHandler) {
        this.el = el;
        this.renderer = renderer;
        this.domHandler = domHandler;
        this.onLazyLoad = new core_1.EventEmitter();
        this.buffer = 0.9;
        this.dataToRender = [];
        this.first = 0;
    }
    DataScroller.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.lazy) {
            this.load();
        }
        if (this.loader) {
            this.scrollFunction = this.renderer.listen(this.loader, 'click', function () {
                _this.load();
            });
        }
        else {
            this.bindScrollListener();
        }
    };
    DataScroller.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    Object.defineProperty(DataScroller.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val;
            this.handleDataChange();
        },
        enumerable: true,
        configurable: true
    });
    DataScroller.prototype.handleDataChange = function () {
        if (this.lazy)
            this.dataToRender = this.value;
        else
            this.load();
    };
    DataScroller.prototype.load = function () {
        if (this.lazy) {
            this.onLazyLoad.emit({
                first: this.first,
                rows: this.rows
            });
            this.first = this.first + this.rows;
        }
        else {
            if (this.value) {
                for (var i = this.first; i < (this.first + this.rows); i++) {
                    if (i >= this.value.length) {
                        break;
                    }
                    this.dataToRender.push(this.value[i]);
                }
                this.first = this.first + this.rows;
            }
        }
    };
    DataScroller.prototype.reset = function () {
        this.first = 0;
        this.dataToRender = [];
        this.load();
    };
    DataScroller.prototype.isEmpty = function () {
        return !this.dataToRender || (this.dataToRender.length == 0);
    };
    DataScroller.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.rows
        };
    };
    DataScroller.prototype.bindScrollListener = function () {
        var _this = this;
        if (this.inline) {
            this.contentElement = this.contentViewChild.nativeElement;
            this.scrollFunction = this.renderer.listen(this.contentElement, 'scroll', function () {
                var scrollTop = _this.contentElement.scrollTop;
                var scrollHeight = _this.contentElement.scrollHeight;
                var viewportHeight = _this.contentElement.clientHeight;
                if ((scrollTop >= ((scrollHeight * _this.buffer) - (viewportHeight)))) {
                    _this.load();
                }
            });
        }
        else {
            this.scrollFunction = this.renderer.listen('window', 'scroll', function () {
                var docBody = document.body;
                var docElement = document.documentElement;
                var scrollTop = (window.pageYOffset || document.documentElement.scrollTop);
                var winHeight = docElement.clientHeight;
                var docHeight = Math.max(docBody.scrollHeight, docBody.offsetHeight, winHeight, docElement.scrollHeight, docElement.offsetHeight);
                if (scrollTop >= ((docHeight * _this.buffer) - winHeight)) {
                    _this.load();
                }
            });
        }
    };
    DataScroller.prototype.ngOnDestroy = function () {
        //unbind
        if (this.scrollFunction) {
            this.scrollFunction();
            this.contentElement = null;
        }
    };
    return DataScroller;
}());
DataScroller.decorators = [
    { type: core_1.Component, args: [{
                selector: 'p-dataScroller',
                template: "\n    <div [ngClass]=\"{'ui-datascroller ui-widget': true, 'ui-datascroller-inline': inline}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n        <div class=\"ui-datascroller-header ui-widget-header ui-corner-top\" *ngIf=\"header\">\n            <ng-content select=\"p-header\"></ng-content>\n        </div>\n        <div #content class=\"ui-datascroller-content ui-widget-content\" [ngStyle]=\"{'max-height': scrollHeight}\">\n            <ul class=\"ui-datascroller-list\">\n                <li *ngFor=\"let item of dataToRender\">\n                    <ng-template [pTemplateWrapper]=\"itemTemplate\" [item]=\"item\"></ng-template>\n                </li>\n            </ul>\n        </div>\n        <div class=\"ui-datascroller-footer ui-widget-header ui-corner-bottom\" *ngIf=\"footer\">\n            <ng-content select=\"p-footer\"></ng-content>\n        </div>\n    </div>\n    ",
                providers: [domhandler_1.DomHandler]
            },] },
];
/** @nocollapse */
DataScroller.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer2, },
    { type: domhandler_1.DomHandler, },
]; };
DataScroller.propDecorators = {
    'rows': [{ type: core_1.Input },],
    'lazy': [{ type: core_1.Input },],
    'onLazyLoad': [{ type: core_1.Output },],
    'style': [{ type: core_1.Input },],
    'styleClass': [{ type: core_1.Input },],
    'buffer': [{ type: core_1.Input },],
    'inline': [{ type: core_1.Input },],
    'scrollHeight': [{ type: core_1.Input },],
    'loader': [{ type: core_1.Input },],
    'contentViewChild': [{ type: core_1.ViewChild, args: ['content',] },],
    'header': [{ type: core_1.ContentChild, args: [shared_1.Header,] },],
    'footer': [{ type: core_1.ContentChild, args: [shared_1.Footer,] },],
    'templates': [{ type: core_1.ContentChildren, args: [shared_1.PrimeTemplate,] },],
    'value': [{ type: core_1.Input },],
};
exports.DataScroller = DataScroller;
var DataScrollerModule = (function () {
    function DataScrollerModule() {
    }
    return DataScrollerModule;
}());
DataScrollerModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, shared_1.SharedModule],
                exports: [DataScroller, shared_1.SharedModule],
                declarations: [DataScroller]
            },] },
];
/** @nocollapse */
DataScrollerModule.ctorParameters = function () { return []; };
exports.DataScrollerModule = DataScrollerModule;
//# sourceMappingURL=datascroller.js.map