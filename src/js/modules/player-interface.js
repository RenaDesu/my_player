import WaveSurfer from 'wavesurfer.js';

const playBtn = document.querySelector('[data-play]');
const nextBtn = document.querySelector('[data-next]');
const mainTrack = document.querySelector('[data-track]');
const progressContainer = document.querySelector('[data-progress-container]');
const progressBar = document.querySelector('[data-progress-bar]');
const trackTitle = document.querySelector('[data-track-title]');
const trackCover = document.querySelector('[data-track-cover]');
const icon = document.querySelector('[data-icon]');
const trackState = document.querySelector('[data-state]');
const volume = document.querySelector('[data-volume]');
const trackCurrentTime = document.querySelector('[data-current-time]');
const trackDuration = document.querySelector('[data-duration]');

let isPlaying = false;

// Визуализация звуковых волн трека
const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#ca90ec',
    progressColor: '#ad43eb',
    height: 50,
    interact: false,
    media: mainTrack,
});

//Воспроизведение/пауза
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
});
//Выбор песен из медиатеки и их воспроизведение
window.addEventListener('click', (e) => {
    const target = e.target;
    if (target.hasAttribute('data-track-item')) {
        const parent = target.closest('.player__item');
        const cover = target;
        const titleEl = parent.querySelector('.player__track-title');
        const id = titleEl.dataset.title;
        const title = titleEl.innerText;
        const track = parent.querySelector('[data-track-src]');
 
        selectTrack(title, track, cover, id);

        /*
        Песня обновляется, но волны не перерисовываются. Не понимаю, как
        можно решить эту проблему. В документации не нашла метод, который 
        перерисует волны (документация неполная дана, нет методов в перечне). 
        */
        wavesurfer.media = mainTrack;
      
        playTrack();
    }
});
//Следующий трек/предыдущий трек
window.addEventListener('click', (e) => {
    const target = e.target;
    nextTrack(target);
    prevTrack(target);
});
//Выбор песни
function selectTrack(title, track, cover, id) {
    trackTitle.innerText = title;
    trackTitle.id = id;
    mainTrack.src = track.src;
    trackCover.src = cover.src;
}
//Воспроизведение
function playTrack() {
    isPlaying = true;
    icon.src = 'images/pause.png';
    trackState.innerText = 'Играет';
    mainTrack.play();
}
//Пауза
function pauseTrack() {
    isPlaying = false;
    icon.src = 'images/play.png';
    trackState.innerText = 'Не играет';
    mainTrack.pause();
}
//Следующий трек
function nextTrack(target) {
    if (target.hasAttribute('data-next')) {
        const parent = target.closest('.interface__wrapper');
        const titleEl = parent.querySelector('[data-track-title]');
        const title = titleEl.id;

        if (title == 5) {
            document.querySelector(`[data-track-item="1"]`).click();
        } else {
            document.querySelector(`[data-track-item="${parseInt(title) + 1}"]`).click();
        }
    }
}
//Предыдущий трек
function prevTrack(target) {
    if (target.hasAttribute('data-prev')) {
        const parent = target.closest('.interface__wrapper');
        const titleEl = parent.querySelector('[data-track-title]');
        const title = titleEl.id;

        if (title == 1) {
            document.querySelector(`[data-track-item="5"]`).click();
        } else {
            document.querySelector(`[data-track-item="${parseInt(title) - 1}"]`).click();
        }
    }
}

//Перемотка трека и отображение прогресса
mainTrack.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', rewindTrack);

//Отображение прогресса
function updateProgress(e) {
    const {
        duration,
        currentTime
    } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    /*
    Есть один баг. Пока не знаю, как от него избавиться. Когда переключаешь трек, то
    на секунду (или даже меньше) на месте, где отображается общая длительность трека,
    выходит NanNan:NanNan. Видимо, это связано с задержкой в получении длительности
    трека. Буду рада совету, как от этого избавиться.
    */
    trackCurrentTime.innerText = convertTime(currentTime);
    trackDuration.innerText = convertTime(duration);
}
//Перемотка трека
function rewindTrack(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = mainTrack.duration;
    mainTrack.currentTime = (clickX / width) * duration;
}
//Автопереключение трека
mainTrack.addEventListener('ended', () => {
    if (trackTitle.id !== 4) {
        icon.src = 'images/play.png';
        trackState.innerText = 'Не играет';
        nextBtn.click();
    }
});
//Регулировка звука
volume.addEventListener('input', (e) => {
    const target = e.target;
    if (target.value == 1) {
        mainTrack.volume = 1.0;
    }
    if (target.value == 0) {
        mainTrack.volume = 0.0;
    }
    const volume = parseInt(target.value) / 100;
    mainTrack.volume = volume;
});
//Конвертация времени
function convertTime(time) {
    let mins = Math.floor(time / 60);
    if (mins < 10) {
        mins = '0' + String(mins);
    }
    let secs = Math.floor(time % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }
    return mins + ':' + secs;
}