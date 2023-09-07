const playerInterface = document.querySelector('[data-interface]');
const playBtn = document.querySelector('[data-play]');
const prevBtn = document.querySelector('[data-prev]');
const nextBtn = document.querySelector('[data-next]');
const mainTrack = document.querySelector('[data-track]');
const progressContainer = document.querySelector('[data-progress-container]');
const progressBar = document.querySelector('[data-progress-bar]');
const trackTitle = document.querySelector('[data-track-title]');
const trackCover = document.querySelector('[data-track-cover]');
const icon = document.querySelector('[data-icon]');
const trackTitles = document.querySelectorAll('[data-title]');

let isPlaying = false;

//Воспроизведение/пауза
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseTrack()
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
        const title = titleEl.innerText;
        const track = parent.querySelector('[data-track-src]');
        selectTrack(title, track, cover);
        playTrack();
    }
});
//Выбор песни
function selectTrack(title, track, cover) {
    trackTitle.innerText = title;
    mainTrack.src = track.src;
    trackCover.src = cover.src;
}
//Воспроизведение
function playTrack() {
    isPlaying = true;
    icon.src = 'images/pause.png';
    mainTrack.play();
}
//Пауза
function pauseTrack() {
    isPlaying = false;
    icon.src = 'images/play.png';
    mainTrack.pause();
}