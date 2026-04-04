console.log("Spotify Clone Working");

// GLOBALS
let currentSong = new Audio();

let songs = [
    "Khoobsurat From Ek Deewane Ki Deewaniyat Original Motion Picture Soundtrack-128kbps.mp3",
    "Dhun From Saiyaara-128kbps.mp3",
    "Bairan.mp3",
    "deewaniyat from ek deewane ki deewaniyat original motion picture soundtrack-128kbps.mp3",
];

let currFolder = "songs";

// Convert seconds to mm:ss
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";

    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);

    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

// LOAD SONG LIST
function loadSongs() {
    let ul = document.querySelector(".songList ul");
    ul.innerHTML = "";

    songs.forEach((song, index) => {
        ul.innerHTML += `
        <li>
            <img class="invert" width="30" src="img/music.svg">
            <div class="info">
                <div>${song}</div>
                <div>Vikas</div>
            </div>
            <div class="playnow">▶</div>
        </li>`;
    });

    // click events
    Array.from(ul.getElementsByTagName("li")).forEach((li, index) => {
        li.addEventListener("click", () => {
            playMusic(songs[index]);
        });
    });
}

// PLAY SONG
function playMusic(track, pause = false) {
    currentSong.src = `${currFolder}/${track}`;

    if (!pause) {
        currentSong.play();
        document.getElementById("play").src = "img/pause.svg";
    }

    document.querySelector(".songinfo").innerText = track;
}

// MAIN FUNCTION
function main() {

    loadSongs();

    let playBtn = document.getElementById("play");

    // PLAY / PAUSE
    playBtn.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            playBtn.src = "img/pause.svg";
        } else {
            currentSong.pause();
            playBtn.src = "img/play.svg";
        }
    });

    // TIME UPDATE
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML =
            `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;

        document.querySelector(".circle").style.left =
            (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    // SEEK BAR
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;

        currentSong.currentTime = (currentSong.duration * percent) / 100;
        document.querySelector(".circle").style.left = percent + "%";
    });

    // NEXT
    document.getElementById("next").addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").pop());

        if (index + 1 < songs.length) {
            playMusic(songs[index + 1]);
        }
    });

    // PREVIOUS
    document.getElementById("previous").addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").pop());

        if (index - 1 >= 0) {
            playMusic(songs[index - 1]);
        }
    });

    // VOLUME
    document.querySelector(".range input").addEventListener("input", (e) => {
        currentSong.volume = e.target.value / 100;
    });
}

// START
main();