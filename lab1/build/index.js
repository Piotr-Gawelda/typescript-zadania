var App = /** @class */ (function () {
    function App() {
        this.startApp();
    }
    App.prototype.startApp = function () {
        this.getInputs();
        this.inputsObserver();
    };
    App.prototype.inputsObserver = function () {
        var _this = this;
        this.enterNumber = document.querySelector('#enterNumber');
        this.enterNumber.addEventListener("input", function () { return _this.generateInputs(); });
    };
    App.prototype.generateInputs = function () {
        var _this = this;
        var number = parseInt(this.enterNumber.value);
        var wrapper = document.querySelector('#input-wrapper');
        wrapper.innerHTML = "";
        if (number > 0) {
            for (var i = 0; i < number; i++) {
                var div = document.createElement("div");
                div.id = "div" + i;
                var checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                var button = document.createElement("button");
                button.innerText = "Usuń";
                button.id = "button" + i;
                button.addEventListener("click", function (event) { return _this.removeInput(event); });
                var input = document.createElement("input");
                input.type = "number";
                input.id = "input" + i;
                input.addEventListener("input", function () { return _this.getStatistics(); });
                div.appendChild(input);
                div.appendChild(checkbox);
                div.appendChild(button);
                wrapper.appendChild(div);
            }
        }
        var button = document.createElement("button");
        button.innerText = "Usuń zaznaczone";
        button.id = "remove-selected";
        button.addEventListener("click", function () { return _this.removeSelectedInput(); });
        var wrapper = document.querySelector('#button-wrapper');
        wrapper.replaceChildren(button);
    };
    App.prototype.removeSelectedInput = function () {
        var _this = this;
        var wrapper = document.querySelector("#input-wrapper");
        var toRemove = [];
        wrapper.childNodes.forEach(function (x) {
            var input = x.childNodes[1];
            var val = input.checked;
            if (val) {
                toRemove.push(x);
            }
        });
        toRemove.forEach(function (y) {
            y.remove();
            _this.getStatistics();
        });
    };
    App.prototype.removeInput = function (event) {
        var bttn = event.target;
        var elem = bttn.parentNode;
        elem.remove();
        this.getStatistics();
    };
    App.prototype.getInputs = function () {
        this.sum1Input = document.querySelector('#sum');
        this.avgInput = document.querySelector('#avg');
        this.minInput = document.querySelector('#min');
        this.maxInput = document.querySelector('#max');
    };
    App.prototype.setValue = function (element, value) {
        element.innerText = value;
        element.classList.remove("loader");
    };
    App.prototype.getStatistics = function () {
        var min = Number.MAX_VALUE;
        var max = Number.MIN_VALUE;
        var sum = 0;
        var avg = 0;
        var count = 0;
        var allHasValue = true;
        var wrapper = document.querySelector("#input-wrapper");
        wrapper.childNodes.forEach(function (x) {
            var input = x.firstChild;
            var val = parseInt(input.value);
            if (Number.isNaN(val)) {
                allHasValue = false;
            }
            else {
                min = Math.min(min, val);
                max = Math.max(max, val);
                sum += val;
                count++;
            }
        });
        avg = sum / count;
        if (allHasValue && wrapper.childNodes.length > 0) {
            this.showStatistics(sum, avg, min, max);
        }
        else {
            this.showLoader();
        }
    };
    App.prototype.showLoader = function () {
        this.sum1Input.classList.add("loader");
        this.avgInput.classList.add("loader");
        this.minInput.classList.add("loader");
        this.maxInput.classList.add("loader");
        this.sum1Input.innerText = "";
        this.avgInput.innerText = "";
        this.minInput.innerText = "";
        this.maxInput.innerText = "";
    };
    App.prototype.showStatistics = function (sum, avg, min, max) {
        this.setValue(this.sum1Input, sum.toString());
        this.setValue(this.avgInput, avg.toString());
        this.setValue(this.minInput, min.toString());
        this.setValue(this.maxInput, max.toString());
    };
    return App;
}());
var app = new App();
