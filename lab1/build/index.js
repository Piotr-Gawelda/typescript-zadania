// const sumInput = document.querySelector("#sum");
// const firstInput = document.querySelector("#firstInput");
// const secInput = document.querySelector("#secInput");
// const thirdInput = document.querySelector("#thirdInput");
// const fourthInput = document.querySelector("#fourthInput");
// function sum(first: number, sec: number, third: number, fourth: number) {
//     return first + sec + third + fourth;
// }
// // sumInput.addEventListener("onchange", function() {
// // })
var StatisticsApp = /** @class */ (function () {
    function StatisticsApp() {
        console.log(this);
        this.startApp();
    }
    StatisticsApp.prototype.startApp = function () {
        this.getInputs();
        this.inputsObserver();
    };
    StatisticsApp.prototype.inputsObserver = function () {
        var _this = this;
        this.data1Input.addEventListener("input", function () { return _this.getStatistics(); });
        this.data2Input.addEventListener("input", function () { return _this.getStatistics(); });
        this.data3Input.addEventListener("input", function () { return _this.getStatistics(); });
        this.data4Input.addEventListener("input", function () { return _this.getStatistics(); });
    };
    StatisticsApp.prototype.getInputs = function () {
        this.data1Input = document.querySelector('#data1');
        this.data2Input = document.querySelector('#data2');
        this.data3Input = document.querySelector('#data3');
        this.data4Input = document.querySelector('#data4');
        this.sum1Input = document.querySelector('#sum');
        this.avgInput = document.querySelector('#avg');
        this.minInput = document.querySelector('#min');
        this.maxInput = document.querySelector('#max');
    };
    StatisticsApp.prototype.getValue = function (element) {
        var value = element.value;
        var intValue = parseInt(value);
        return intValue !== NaN ? intValue : 0;
    };
    StatisticsApp.prototype.setValue = function (element, value) {
        element.value = value;
    };
    StatisticsApp.prototype.getStatistics = function () {
        var data1 = this.getValue(this.data1Input);
        var data2 = this.getValue(this.data2Input);
        var data3 = this.getValue(this.data3Input);
        var data4 = this.getValue(this.data4Input);
        var sum = data1 + data2 + data3 + data4;
        var avg = sum / 4;
        var min = Math.min(data1, data2, data3, data4);
        var max = Math.max(data1, data2, data3, data4);
        this.showStatistics(sum, avg, min, max);
    };
    StatisticsApp.prototype.showStatistics = function (sum, avg, min, max) {
        this.setValue(this.sum1Input, sum.toString());
        this.setValue(this.avgInput, avg.toString());
        this.setValue(this.minInput, min.toString());
        this.setValue(this.maxInput, max.toString());
    };
    return StatisticsApp;
}());
var app = new StatisticsApp();
