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
        this.sounds = {};
        this.activeRecord = -1;
        this.records = [];
        this.channels = [];
        this.appStart();
    }
    App.prototype.appStart = function () {
        var _this = this;
        document.addEventListener('keypress', function (event) { return _this.onKeyPress(event); });
        this.getAudioElements();
        this.getChannelsElements();
    };
    App.prototype.getChannelsElements = function () {
        var _this = this;
        var channels = document.querySelectorAll('[data-channel]');
        channels.forEach(function (x, index) {
            var ind = index + 1;
            var record = x.querySelector("#record-" + ind);
            record.addEventListener('click', function () { return _this.recordClick(ind); });
            _this.records.push(record);
            var note = x.querySelector("#notes-" + ind);
            var play = x.querySelector("#play-" + ind);
            play.addEventListener('click', function () { return _this.onPlayChannel(ind); });
            _this.channels.push(new Channel(ind, record, note));
        });
    };
    App.prototype.recordClick = function (id) {
        var channel = this.channels.find(function (x) { return x.id === id; });
        if (this.activeRecord === id) {
            this.activeRecord = -1;
            channel.record.classList.remove("active");
            return;
        }
        this.activeRecord = id;
        this.records.forEach(function (x) {
            if (x.classList)
                x.classList.remove("active");
        });
        channel.record.classList.add("active");
    };
    App.prototype.onPlayChannel = function (index) {
        var channel = this.channels.find(function (x) { return x.id === index; });
        var index = 0;
        if (channel.notes.length > 0) {
            this.playOneElement(channel.notes, index);
        }
    };
    App.prototype.playOneElement = function (keys, index) {
        var _this = this;
        if (index >= keys.length) {
            return;
        }
        var audio = this.sounds[keys[index]];
        index++;
        audio.element.onended = function () {
            audio.element.onended = null;
            _this.playOneElement(keys, index);
        };
        audio.play();
    };
    App.prototype.getAudioElements = function () {
        var _this = this;
        var audios = document.querySelectorAll('[data-sound-key]');
        audios.forEach(function (x) {
            var key = x.getAttribute('data-sound-key');
            var audio = _this.getAudio(x, key);
            _this.sounds[key] = audio;
        });
        audios = document.querySelectorAll('[data-key]');
        audios.forEach(function (x) {
            var key = x.getAttribute('data-key');
            x.addEventListener("click", function () { return _this.playSound(key); });
        });
    };
    App.prototype.getAudio = function (x, y) {
        return new AudioElement(x, y);
    };
    App.prototype.onKeyPress = function (ev) {
        var key = ev.key;
        this.playSound(key);
    };
    App.prototype.playSound = function (key) {
        var _this = this;
        var elem = this.sounds[key];
        if (elem) {
            elem.play();
        }
        else {
            return;
        }
        if (this.activeRecord !== -1) {
            var channelId = this.channels.findIndex(function (x) { return x.id === _this.activeRecord; });
            this.channels[channelId].notes.push(key);
            var elemSpan = document.createElement("span");
            elemSpan.innerText = key.toUpperCase();
            this.channels[channelId].note.appendChild(elemSpan);
        }
    };
    return App;
}());
var app = new App();
