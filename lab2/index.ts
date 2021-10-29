class AudioElement {

    constructor(element: HTMLAudioElement, key: string) {
        this.element = element;
        this.key = key;
    }
    element: HTMLAudioElement;
    key: string;

    play ? () : void {
        this.element.currentTime = 0;
        this.element.play();
    }
}

class Channel {
    id: number;
    notes: string[];
    record: Element;
    note: Element;

    constructor(id: number, record: Element, note: Element) {
        this.id = id;
        this.record = record
        this.note = note;
        this.notes = [];
    }
}

class App {

    sounds: {
        [id: string]: AudioElement;
    } = {};

    activeRecord: Number = -1;
    records: Element[] = [];

    channels: Channel[] = [];
    constructor() {
        this.appStart();
    }

    appStart() {
        document.addEventListener('keypress', event => this.onKeyPress(event));
        this.getAudioElements();
        this.getChannelsElements();
    }

    getChannelsElements() {
        var channels = document.querySelectorAll('[data-channel]');
        channels.forEach((x, index) => {
            var ind = index + 1;
            var record = x.querySelector("#record-" + ind);
            record.addEventListener('click', () => this.recordClick(ind));
            this.records.push(record);
            var note = x.querySelector("#notes-" + ind);
            var play = x.querySelector("#play-" + ind);
            play.addEventListener('click', () => this.onPlayChannel(ind));
            this.channels.push(new Channel(ind, record, note));
        });
    }

    recordClick(id: Number) {
        var channel = this.channels.find(x => x.id === id);

        if (this.activeRecord === id) {
            this.activeRecord = -1;
            channel.record.classList.remove("active");
            return;
        }

        this.activeRecord = id;
        this.records.forEach(x => {
            if (x.classList)
                x.classList.remove("active");
        })
        channel.record.classList.add("active");
    }

    onPlayChannel(index: number): void {
        var channel = this.channels.find(x => x.id === index);
        var index = 0;
        if (channel.notes.length > 0) {
            this.playOneElement(channel.notes, index);
        }
    }

    playOneElement(keys: string[], index: number) {
        if (index >= keys.length) {
            return;
        }

        var audio = this.sounds[keys[index]];
        index++;
        audio.element.onended = () => {
            audio.element.onended = null;
            this.playOneElement(keys, index)
        }
        audio.play();
    }

    getAudioElements(): void {
        var audios = document.querySelectorAll('[data-sound-key]');
        audios.forEach(x => {
            var key = x.getAttribute('data-sound-key');
            const audio = this.getAudio(x, key);
            this.sounds[key] = audio;
        });

        audios = document.querySelectorAll('[data-key]');
        audios.forEach(x => {
            var key = x.getAttribute('data-key');
            x.addEventListener("click", () => this.playSound(key));
        });
    }

    getAudio(x: any, y: any): AudioElement {
        return new AudioElement(x, y);
    }


    onKeyPress(ev: KeyboardEvent): void {
        const key = ev.key;
        this.playSound(key);
    }

    playSound(key: string) {
        var elem = this.sounds[key];
        if (elem) {
            elem.play();
        } else {
            return;
        }
        if (this.activeRecord !== -1) {
            var channelId = this.channels.findIndex(x => x.id === this.activeRecord);
            this.channels[channelId].notes.push(key);
            var elemSpan = document.createElement("span");
            elemSpan.innerText = key.toUpperCase();
            this.channels[channelId].note.appendChild(elemSpan);
        }
    }
}
const app = new App();