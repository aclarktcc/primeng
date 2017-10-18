"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var common_1 = require("@angular/common");
var domhandler_1 = require("../dom/domhandler");
var Sidebar = (function () {
    function Sidebar(el, domHandler, renderer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.position = 'left';
        this.blockScroll = false;
        this.baseZIndex = 0;
        this.onShow = new core_1.EventEmitter();
        this.onHide = new core_1.EventEmitter();
        this.visibleChange = new core_1.EventEmitter();
    }
    Sidebar.prototype.ngAfterViewInit = function () {
        this.initialized = true;
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.containerViewChild.nativeElement);
            else
                this.domHandler.appendChild(this.containerViewChild.nativeElement, this.appendTo);
        }
        if (this.visible) {
            this.show();
        }
    };
    Object.defineProperty(Sidebar.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (val) {
            this._visible = val;
            if (this.initialized && this.containerViewChild && this.containerViewChild.nativeElement) {
                if (this._visible)
                    this.show();
                else {
                    if (this.preventVisibleChangePropagation)
                        this.preventVisibleChangePropagation = false;
                    else
                        this.hide();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Sidebar.prototype.ngAfterViewChecked = function () {
        if (this.executePostDisplayActions) {
            this.onShow.emit({});
            this.executePostDisplayActions = false;
        }
    };
    Sidebar.prototype.show = function () {
        this.executePostDisplayActions = true;
        this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++domhandler_1.DomHandler.zindex));
        this.enableModality();
    };
    Sidebar.prototype.hide = function () {
        this.onHide.emit({});
        this.disableModality();
    };
    Sidebar.prototype.close = function (event) {
        this.preventVisibleChangePropagation = true;
        this.hide();
        this.visibleChange.emit(false);
        event.preventDefault();
    };
    Sidebar.prototype.enableModality = function () {
        var _this = this;
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(this.containerViewChild.nativeElement.style.zIndex) - 1);
            this.domHandler.addMultipleClasses(this.mask, 'ui-widget-overlay ui-sidebar-mask');
            this.maskClickListener = this.renderer.listen(this.mask, 'click', function (event) {
                _this.close(event);
            });
            document.body.appendChild(this.mask);
            if (this.blockScroll) {
                this.domHandler.addClass(document.body, 'ui-overflow-hidden');
            }
        }
    };
    Sidebar.prototype.disableModality = function () {
        if (this.mask) {
            this.unbindMaskClickListener();
            document.body.removeChild(this.mask);
            if (this.blockScroll) {
                this.domHandler.removeClass(document.body, 'ui-overflow-hidden');
            }
            this.mask = null;
        }
    };
    Sidebar.prototype.unbindMaskClickListener = function () {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    };
    Sidebar.prototype.ngOnDestroy = function () {
        this.initialized = false;
        if (this.visible) {
            this.hide();
        }
        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
        }
        this.unbindMaskClickListener();
    };
    return Sidebar;
}());
Sidebar.decorators = [
    { type: core_1.Component, args: [{
                selector: 'p-sidebar',
                template: "\n        <div #container [ngClass]=\"{'ui-sidebar ui-widget ui-widget-content ui-shadow':true, 'ui-sidebar-active': visible, \n            'ui-sidebar-left': (position === 'left'), 'ui-sidebar-right': (position === 'right'),\n            'ui-sidebar-top': (position === 'top'), 'ui-sidebar-bottom': (position === 'bottom'), \n            'ui-sidebar-full': fullScreen}\"\n            [@panelState]=\"visible ? 'visible' : 'hidden'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <a [ngClass]=\"{'ui-sidebar-close ui-corner-all':true}\" href=\"#\" role=\"button\" (click)=\"close($event)\">\n                <span class=\"fa fa-fw fa-close\"></span>\n            </a>\n            <ng-content></ng-content>\n        </div>\n    ",
                animations: [
                    animations_1.trigger('panelState', [
                        animations_1.state('hidden', animations_1.style({
                            opacity: 0
                        })),
                        animations_1.state('visible', animations_1.style({
                            opacity: 1
                        })),
                        animations_1.transition('visible => hidden', animations_1.animate('300ms ease-in')),
                        animations_1.transition('hidden => visible', animations_1.animate('300ms ease-out'))
                    ])
                ],
                providers: [domhandler_1.DomHandler]
            },] },
];
/** @nocollapse */
Sidebar.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: domhandler_1.DomHandler, },
    { type: core_1.Renderer2, },
]; };
Sidebar.propDecorators = {
    'position': [{ type: core_1.Input },],
    'fullScreen': [{ type: core_1.Input },],
    'appendTo': [{ type: core_1.Input },],
    'blockScroll': [{ type: core_1.Input },],
    'style': [{ type: core_1.Input },],
    'styleClass': [{ type: core_1.Input },],
    'baseZIndex': [{ type: core_1.Input },],
    'containerViewChild': [{ type: core_1.ViewChild, args: ['container',] },],
    'onShow': [{ type: core_1.Output },],
    'onHide': [{ type: core_1.Output },],
    'visibleChange': [{ type: core_1.Output },],
    'visible': [{ type: core_1.Input },],
};
exports.Sidebar = Sidebar;
var SidebarModule = (function () {
    function SidebarModule() {
    }
    return SidebarModule;
}());
SidebarModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                exports: [Sidebar],
                declarations: [Sidebar]
            },] },
];
/** @nocollapse */
SidebarModule.ctorParameters = function () { return []; };
exports.SidebarModule = SidebarModule;
//# sourceMappingURL=sidebar.js.map