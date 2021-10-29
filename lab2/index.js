var AudioElement = /** @class */ (function () {
    function AudioElement(element, key) {
        this.element = element;
        this.key = key;
    }
    AudioElement.prototype.play = function () {
        this.element.currentTime = 0;
        this.element.play();
    };
    return AudioElement;
}());
var Channel = /** @class */ (function () {
    function Channel(id, record, note) {
        this.id = id;
        this.record = record;
        this.note = note;
        this.notes = [];
    }
    return Channel;
}());
var App = /** @class */ (function () {
    function App() {
        this.appStart();
    }
    App.prototype.appStart = function () {
    };
    return App;
}());
var app = new App();
