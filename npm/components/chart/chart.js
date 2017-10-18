"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var UIChart = (function () {
    function UIChart(el) {
        this.el = el;
        this.onDataSelect = new core_1.EventEmitter();
    }
    Object.defineProperty(UIChart.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (val) {
            this._data = val;
            this.reinit();
        },
        enumerable: true,
        configurable: true
    });
    UIChart.prototype.ngAfterViewInit = function () {
        this.initChart();
        this.initialized = true;
    };
    UIChart.prototype.onCanvasClick = function (event) {
        if (this.chart) {
            var element = this.chart.getElementAtEvent(event);
            var dataset = this.chart.getDatasetAtEvent(event);
            if (element && element[0] && dataset) {
                this.onDataSelect.emit({ originalEvent: event, element: element[0], dataset: dataset });
            }
        }
    };
    UIChart.prototype.initChart = function () {
        this.chart = new Chart(this.el.nativeElement.children[0].children[0], {
            type: this.type,
            data: this.data,
            options: this.options
        });
    };
    UIChart.prototype.getCanvas = function () {
        return this.el.nativeElement.children[0].children[0];
    };
    UIChart.prototype.getBase64Image = function () {
        return this.chart.toBase64Image();
    };
    UIChart.prototype.generateLegend = function () {
        if (this.chart) {
            this.chart.generateLegend();
        }
    };
    UIChart.prototype.refresh = function () {
        if (this.chart) {
            this.chart.update();
        }
    };
    UIChart.prototype.reinit = function () {
        if (this.chart) {
            this.chart.destroy();
            this.initChart();
        }
    };
    UIChart.prototype.ngOnDestroy = function () {
        if (this.chart) {
            this.chart.destroy();
            this.initialized = false;
            this.chart = null;
        }
    };
    return UIChart;
}());
UIChart.decorators = [
    { type: core_1.Component, args: [{
                selector: 'p-chart',
                template: "\n        <div>\n            <canvas [attr.width]=\"width\" [attr.height]=\"height\" (click)=\"onCanvasClick($event)\"></canvas>\n        </div>\n    "
            },] },
];
/** @nocollapse */
UIChart.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
]; };
UIChart.propDecorators = {
    'type': [{ type: core_1.Input },],
    'options': [{ type: core_1.Input },],
    'width': [{ type: core_1.Input },],
    'height': [{ type: core_1.Input },],
    'onDataSelect': [{ type: core_1.Output },],
    'data': [{ type: core_1.Input },],
};
exports.UIChart = UIChart;
var ChartModule = (function () {
    function ChartModule() {
    }
    return ChartModule;
}());
ChartModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                exports: [UIChart],
                declarations: [UIChart]
            },] },
];
/** @nocollapse */
ChartModule.ctorParameters = function () { return []; };
exports.ChartModule = ChartModule;
//# sourceMappingURL=chart.js.map