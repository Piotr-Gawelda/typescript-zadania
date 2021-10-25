let kickSound: HTMLAudioElement;
let clapSound: HTMLAudioElement;

const channel1: any[] = [];
appStart();

function appStart() {
    document.addEventListener('keypress', onKeyPress);
    const btnPlayChannel1 = document.querySelector('#playChannel1')
    btnPlayChannel1.addEventListener('click', onPlayChannel1);
    getAudioElements();
}
function onPlayChannel1(): void {
    channel1.forEach(sound => {
        setTimeout(() => playSound(sound.key), sound.time)
    })

}

function getAudioElements(): void {
    kickSound = document.querySelector('[data-sound="kick"]');
    clapSound = document.querySelector('[data-sound="clap"]');
}

function onKeyPress(ev: KeyboardEvent): void {
    const key = ev.key;
    const time = ev.timeStamp;

    channel1.push({ key, time })

    playSound(key);
    console.log(channel1);
}

function playSound(key: string) {
    switch (key) {
        case 'a':
            kickSound.currentTime = 0;
            kickSound.play();
            break;
        case 's':
            clapSound.currentTime = 0;
            clapSound.play();
            break;
    }
}
