"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var domhandler_1 = require("../dom/domhandler");
var Tooltip = (function () {
    function Tooltip(el, domHandler, renderer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.tooltipPosition = 'right';
        this.tooltipEvent = 'hover';
        this.appendTo = 'body';
        this.tooltipZIndex = 'auto';
        this.escape = true;
    }
    Tooltip.prototype.onMouseEnter = function (e) {
        if (this.tooltipEvent === 'hover') {
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
                this.destroy();
            }
            this.activate();
        }
    };
    Tooltip.prototype.onMouseLeave = function (e) {
        if (this.tooltipEvent === 'hover') {
            this.deactivate(true);
        }
    };
    Tooltip.prototype.onFocus = function (e) {
        if (this.tooltipEvent === 'focus') {
            this.activate();
        }
    };
    Tooltip.prototype.onBlur = function (e) {
        if (this.tooltipEvent === 'focus') {
            this.deactivate(true);
        }
    };
    Tooltip.prototype.onClick = function (e) {
        if (this.tooltipEvent === 'hover') {
            this.deactivate(true);
        }
    };
    Tooltip.prototype.activate = function () {
        var _this = this;
        this.active = true;
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }
        if (this.showDelay)
            this.showTimeout = setTimeout(function () { _this.show(); }, this.showDelay);
        else
            this.show();
        if (this.life) {
            this.lifeTimeout = setTimeout(function () { _this.deactivate(false); }, this.life);
        }
    };
    Tooltip.prototype.deactivate = function (useDelay) {
        var _this = this;
        this.active = false;
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
        }
        if (this.lifeTimeout) {
            clearTimeout(this.lifeTimeout);
        }
        if (this.hideDelay && useDelay)
            this.hideTimeout = setTimeout(function () { _this.hide(); }, this.hideDelay);
        else
            this.hide();
    };
    Object.defineProperty(Tooltip.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (text) {
            this._text = text;
            if (this.active) {
                if (this._text) {
                    if (this.container && this.container.offsetParent)
                        this.updateText();
                    else
                        this.show();
                }
                else {
                    this.hide();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Tooltip.prototype.create = function () {
        this.container = document.createElement('div');
        var tooltipArrow = document.createElement('div');
        tooltipArrow.className = 'ui-tooltip-arrow';
        this.container.appendChild(tooltipArrow);
        this.tooltipText = document.createElement('div');
        this.tooltipText.className = 'ui-tooltip-text ui-shadow ui-corner-all';
        this.updateText();
        if (this.positionStyle) {
            this.container.style.position = this.positionStyle;
        }
        this.container.appendChild(this.tooltipText);
        if (this.appendTo === 'body')
            document.body.appendChild(this.container);
        else if (this.appendTo === 'target')
            this.domHandler.appendChild(this.container, this.el.nativeElement);
        else
            this.domHandler.appendChild(this.container, this.appendTo);
        this.container.style.display = 'inline-block';
    };
    Tooltip.prototype.show = function () {
        if (!this.text || this.disabled) {
            return;
        }
        this.create();
        this.align();
        if (this.tooltipStyleClass) {
            this.container.className = this.container.className + ' ' + this.tooltipStyleClass;
        }
        this.domHandler.fadeIn(this.container, 250);
        if (this.tooltipZIndex === 'auto')
            this.container.style.zIndex = ++domhandler_1.DomHandler.zindex;
        else
            this.container.style.zIndex = this.tooltipZIndex;
        this.bindDocumentResizeListener();
    };
    Tooltip.prototype.hide = function () {
        this.destroy();
    };
    Tooltip.prototype.updateText = function () {
        if (this.escape) {
            this.tooltipText.innerHTML = '';
            this.tooltipText.appendChild(document.createTextNode(this._text));
        }
        else {
            this.tooltipText.innerHTML = this._text;
        }
    };
    Tooltip.prototype.align = function () {
        var position = this.tooltipPosition;
        switch (position) {
            case 'top':
                this.alignTop();
                if (this.isOutOfBounds()) {
                    this.alignBottom();
                }
                break;
            case 'bottom':
                this.alignBottom();
                if (this.isOutOfBounds()) {
                    this.alignTop();
                }
                break;
            case 'left':
                this.alignLeft();
                if (this.isOutOfBounds()) {
                    this.alignRight();
                    if (this.isOutOfBounds()) {
                        this.alignTop();
                        if (this.isOutOfBounds()) {
                            this.alignBottom();
                        }
                    }
                }
                break;
            case 'right':
                this.alignRight();
                if (this.isOutOfBounds()) {
                    this.alignLeft();
                    if (this.isOutOfBounds()) {
                        this.alignTop();
                        if (this.isOutOfBounds()) {
                            this.alignBottom();
                        }
                    }
                }
                break;
        }
    };
    Tooltip.prototype.getHostOffset = function () {
        var offset = this.el.nativeElement.getBoundingClientRect();
        var targetLeft = offset.left + this.domHandler.getWindowScrollLeft();
        var targetTop = offset.top + this.domHandler.getWindowScrollTop();
        return { left: targetLeft, top: targetTop };
    };
    Tooltip.prototype.alignRight = function () {
        this.preAlign();
        this.container.className = 'ui-tooltip ui-widget ui-tooltip-right';
        var hostOffset = this.getHostOffset();
        var left = hostOffset.left + this.domHandler.getOuterWidth(this.el.nativeElement);
        var top = hostOffset.top + (this.domHandler.getOuterHeight(this.el.nativeElement) - this.domHandler.getOuterHeight(this.container)) / 2;
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    };
    Tooltip.prototype.alignLeft = function () {
        this.preAlign();
        this.container.className = 'ui-tooltip ui-widget ui-tooltip-left';
        var hostOffset = this.getHostOffset();
        var left = hostOffset.left - this.domHandler.getOuterWidth(this.container);
        var top = hostOffset.top + (this.domHandler.getOuterHeight(this.el.nativeElement) - this.domHandler.getOuterHeight(this.container)) / 2;
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    };
    Tooltip.prototype.alignTop = function () {
        this.preAlign();
        this.container.className = 'ui-tooltip ui-widget ui-tooltip-top';
        var hostOffset = this.getHostOffset();
        var left = hostOffset.left + (this.domHandler.getOuterWidth(this.el.nativeElement) - this.domHandler.getOuterWidth(this.container)) / 2;
        var top = hostOffset.top - this.domHandler.getOuterHeight(this.container);
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    };
    Tooltip.prototype.alignBottom = function () {
        this.preAlign();
        this.container.className = 'ui-tooltip ui-widget ui-tooltip-bottom';
        var hostOffset = this.getHostOffset();
        var left = hostOffset.left + (this.domHandler.getOuterWidth(this.el.nativeElement) - this.domHandler.getOuterWidth(this.container)) / 2;
        var top = hostOffset.top + this.domHandler.getOuterHeight(this.el.nativeElement);
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    };
    Tooltip.prototype.preAlign = function () {
        this.container.style.left = -999 + 'px';
        this.container.style.top = -999 + 'px';
    };
    Tooltip.prototype.isOutOfBounds = function () {
        var offset = this.container.getBoundingClientRect();
        var targetTop = offset.top;
        var targetLeft = offset.left;
        var width = this.domHandler.getOuterWidth(this.container);
        var height = this.domHandler.getOuterHeight(this.container);
        var viewport = this.domHandler.getViewport();
        return (targetLeft + width > viewport.width) || (targetLeft < 0) || (targetTop < 0) || (targetTop + height > viewport.height);
    };
    Tooltip.prototype.bindDocumentResizeListener = function () {
        var _this = this;
        this.documentResizeListener = this.renderer.listen('window', 'resize', function (event) {
            _this.hide();
        });
    };
    Tooltip.prototype.unbindDocumentResizeListener = function () {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    };
    Tooltip.prototype.destroy = function () {
        this.unbindDocumentResizeListener();
        if (this.container && this.container.parentElement) {
            if (this.appendTo === 'body')
                document.body.removeChild(this.container);
            else if (this.appendTo === 'target')
                this.el.nativeElement.removeChild(this.container);
            else
                this.domHandler.removeChild(this.container, this.appendTo);
        }
        this.container = null;
    };
    Tooltip.prototype.ngOnDestroy = function () {
        this.destroy();
    };
    return Tooltip;
}());
Tooltip.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[pTooltip]',
                providers: [domhandler_1.DomHandler]
            },] },
];
/** @nocollapse */
Tooltip.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: domhandler_1.DomHandler, },
    { type: core_1.Renderer2, },
]; };
Tooltip.propDecorators = {
    'tooltipPosition': [{ type: core_1.Input },],
    'tooltipEvent': [{ type: core_1.Input },],
    'appendTo': [{ type: core_1.Input },],
    'positionStyle': [{ type: core_1.Input },],
    'tooltipStyleClass': [{ type: core_1.Input },],
    'tooltipZIndex': [{ type: core_1.Input },],
    'disabled': [{ type: core_1.Input, args: ["tooltipDisabled",] },],
    'escape': [{ type: core_1.Input },],
    'showDelay': [{ type: core_1.Input },],
    'hideDelay': [{ type: core_1.Input },],
    'life': [{ type: core_1.Input },],
    'onMouseEnter': [{ type: core_1.HostListener, args: ['mouseenter', ['$event'],] },],
    'onMouseLeave': [{ type: core_1.HostListener, args: ['mouseleave', ['$event'],] },],
    'onFocus': [{ type: core_1.HostListener, args: ['focus', ['$event'],] },],
    'onBlur': [{ type: core_1.HostListener, args: ['blur', ['$event'],] },],
    'onClick': [{ type: core_1.HostListener, args: ['click', ['$event'],] },],
    'text': [{ type: core_1.Input, args: ['pTooltip',] },],
};
exports.Tooltip = Tooltip;
var TooltipModule = (function () {
    function TooltipModule() {
    }
    return TooltipModule;
}());
TooltipModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                exports: [Tooltip],
                declarations: [Tooltip]
            },] },
];
/** @nocollapse */
TooltipModule.ctorParameters = function () { return []; };
exports.TooltipModule = TooltipModule;
//# sourceMappingURL=tooltip.js.map