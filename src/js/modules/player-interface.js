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
        const id = titleEl.dataset.title;
        const title = titleEl.innerText;
        const track = parent.querySelector('[data-track-src]');
        selectTrack(title, track, cover, id);
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
    mainTrack.play();
}
//Пауза
function pauseTrack() {
    isPlaying = false;
    icon.src = 'images/play.png';
    mainTrack.pause();
}
//Следующий трек
function nextTrack(target) {
    if (target.hasAttribute('data-next')) {
        const parent = target.closest('.interface__wrapper');
        const titleEl = parent.querySelector('[data-track-title]');
        const title = titleEl.id;

        trackTitles.forEach((el) => {
            if (el.dataset.title == parseInt(title) + 1) {
                const parent = el.closest('.player__item');
                const title = el.innerText;
                const track = parent.querySelector('[data-track-src]');
                const cover = parent.querySelector('.player__track-cover');
                const id = el.dataset.title;
                selectTrack(title, track, cover, id);
                playTrack();
            }
        });
    }
}
//Предыдущий трек
function prevTrack(target) {
    if (target.hasAttribute('data-prev')) {
        const parent = target.closest('.interface__wrapper');
        const titleEl = parent.querySelector('[data-track-title]');
        const title = titleEl.id;

        trackTitles.forEach((el) => {
            if (el.dataset.title == parseInt(title) - 1) {
                const parent = el.closest('.player__item');
                const title = el.innerText;
                const track = parent.querySelector('[data-track-src]');
                const cover = parent.querySelector('.player__track-cover');
                const id = el.dataset.title;
                selectTrack(title, track, cover, id);
                playTrack();
            }
        });
    }
}

mainTrack.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', rewindTrack);

function updateProgressBar(e) {
    const {
        duration,
        currentTime
    } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

function rewindTrack(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = mainTrack.duration;
    mainTrack.currentTime = (clickX / width) * duration;
}