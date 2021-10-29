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

    constructor() {
        this.appStart();
    }

    appStart() {

    }
}
const app = new App();