const tracksContainer = document.querySelector('[data-tracks-list]');
const trackTemplate = document.querySelector('#track-template').content
    .querySelector('.player__item');

//Массив с данными для localstorage
const TRACKS = [{
        title: 'Cantante Profane No.205 - 9. Air Pallas',
        titleDataAttr: 1,
        imgDataAttr: 1,
        coverSrc: 'images/bach.jpg',
        artist: 'Johann Sebastian Bach',
        audioSrc: 'audio/Cantante Profane No.205 - 9. Air Pallas.mp3'
    },
    {
        title: 'The Art of Fugue, BWV. 1080 - Contrapunctus 13 a 3 rectus Spiegelfug',
        titleDataAttr: 2,
        imgDataAttr: 2,
        coverSrc: 'images/bach.jpg',
        artist: 'Johann Sebastian Bach',
        audioSrc: 'audio/The Art of Fugue, BWV. 1080 - Contrapunctus 13 a 3 rectus Spiegelfuge.mp3'
    },
    {
        title: 'Cantata BWV 201 - 7. Air Pan a',
        titleDataAttr: 3,
        imgDataAttr: 3,
        coverSrc: 'images/bach.jpg',
        artist: 'Johann Sebastian Bach',
        audioSrc: 'audio/Cantata BWV 201 - 7. Air Pan a.mp3'
    },
    {
        title: 'Cantata BWV 201 - 11. Air Midas a',
        titleDataAttr: 4,
        imgDataAttr: 4,
        coverSrc: 'images/bach.jpg',
        artist: 'Johann Sebastian Bach',
        audioSrc: 'audio/Cantata BWV 201 - 11. Air Midas a.mp3'
    },
    {
        title: 'Cantata BWV 201 - 14. Recitatif Momus Choeur b',
        titleDataAttr: 5,
        imgDataAttr: 5,
        coverSrc: 'images/bach.jpg',
        artist: 'Johann Sebastian Bach',
        audioSrc: 'audio/Cantata BWV 201 - 14. Recitatif Momus Choeur b.mp3'
    },
];

//Запись данных в localStorage
TRACKS.forEach((track, i) => {
    localStorage.setItem(`Track ${i}`, JSON.stringify(track));
});

//Сортировка данных из localStorage
let dataArr = [];

for (let key in localStorage) {

    if (localStorage.hasOwnProperty(key) && key.replace(/[^a-zа-яё]/gi, '') == 'Track') {
        let data;
        data = JSON.parse(localStorage.getItem(key));
        dataArr.push(data);
    }
}

const sortedDataArr = dataArr.sort((x, y) => {
    if (x.titleDataAttr < y.titleDataAttr) {
        return -1;
    }
    if (x.titleDataAttr > y.titleDataAttr) {
        return 1;
    }
    return 0;
});

//Вывод треков на страницу
sortedDataArr.forEach((elem) => {
    addTrack(elem.title, elem.titleDataAttr, elem.imgDataAttr, elem.coverSrc, elem.artist, elem.audioSrc);
});

//Функция для создания карточек треков
function addTrack(trackTitle, trackTitleDataAttr, trackCoverDataAttr, trackCoverSrc, trackArtist, trackSrc) {
    const trackElement = trackTemplate.cloneNode(true);
    trackElement.querySelector('.player__track-cover').src = trackCoverSrc;
    trackElement.querySelector('.player__track-cover').setAttribute('data-track-item', `${trackCoverDataAttr}`);;
    trackElement.querySelector('.player__track-title').innerText = trackTitle;
    trackElement.querySelector('.player__track-title').setAttribute('data-title', `${trackTitleDataAttr}`);
    trackElement.querySelector('.player__track-artist').innerText = trackArtist;
    trackElement.querySelector('[data-track-src]').src = trackSrc;

    tracksContainer.appendChild(trackElement);
}