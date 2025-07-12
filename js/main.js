let allSongs = [
    {
        name: "Blue",
        artist: "Yung Kai",
        img: "blue-yungkai",
        src: "Blue"
    },
    {
        name: "Wish",
        artist: "Diplo feat. Trippie Redd",
        img: "wish-diplo,trippieredd",
        src: "Wish"
    },
    {
        name: "Attention",
        artist: "Charlie Puth",
        img: "attention",
        src: "attention"
    },
    {
        name: "Pastlives",
        artist: "Sapientdream feat. Slushii",
        img: "pastlives-sapientdream,slushii",
        src: "Pastlives"
    },
    {
        name: "Billie Jean",
        artist: "Michael Jackson",
        img: "billejean",
        src: "billiejean"
    },
    {
        name: "Lose Yourself",
        artist: "Eminem",
        img: "loseyourself",
        src: "loseyourself"
    }
]


const container = document.querySelector(".container"),
songImg = container.querySelector(".img-area img"),
songName = container.querySelector(".song-details .name"),
songArtist = container.querySelector(".song-details .artist"),
mainAudio = container.querySelector("#main-audio"),
playPauseBtn = container.querySelector(".play-pause"),
nextBtn = container.querySelector("#next"),
prevBtn = container.querySelector("#prev"),
progressArea = container.querySelector(".progress-area"),
progressBar = container.querySelector(".progress-bar"),
songList = container.querySelector(".music-list"),
moreSongsBtn = container.querySelector("#more-music"),
closeSongsBtn = container.querySelector("#close");


let songIndex = 1;
window.addEventListener("load", () => {
    loadMusic(songIndex);
})

function loadMusic(indexNum){
    songName.textContent = allSongs[indexNum - 1].name;
    songArtist.textContent = allSongs[indexNum - 1].artist;
    songImg.src = `images/${allSongs[indexNum - 1].img}.png`;
    mainAudio.src = `songs/${allSongs[indexNum - 1].src}.mp3`;
}

function playSong(){
    container.classList.add("paused");
    playPauseBtn.querySelector("i").textContent = "pause";
    mainAudio.play();
    songImg.classList.add("spin");
}
function pauseSong(){
    container.classList.remove("paused");
    playPauseBtn.querySelector("i").textContent = "play_arrow";
    mainAudio.pause();
    songImg.classList.remove("spin");
}

function nextSong(){
    songIndex++;
    songIndex > allSongs.length ? songIndex = 1 : songIndex = songIndex;
    loadMusic(songIndex);
    updatePlayingClass();
    playSong();
}
function prevSong(){
    songIndex--;
    songIndex < 1 ? songIndex = allSongs.length : songIndex = songIndex;
    loadMusic(songIndex);
    updatePlayingClass();
    playSong();
}

playPauseBtn.addEventListener("click", () => {
    const isSongPaused = container.classList.contains("paused");
    isSongPaused ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", () => {
    nextSong();
})
prevBtn.addEventListener("click", () => {
    prevSong();
})

mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime/duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let songCurrentTime = container.querySelector(".current-time"),
    songDuration = container.querySelector(".max-duration");
    mainAudio.addEventListener("loadeddata", () => {
        let mainDuration = mainAudio.duration;
        let totalMin = Math.floor(mainDuration/60);
        let totalSec = Math.floor(mainDuration%60);
        if(totalSec < 10) totalSec = `0${totalSec}`
        songDuration.textContent = `${totalMin}:${totalSec}`
    });

    let currentMin = Math.floor(currentTime/60);
    let currentSec = Math.floor(currentTime%60);
    if(currentSec < 10) currentSec = `0${currentSec}`
    songCurrentTime.textContent = `${currentMin}:${currentSec}`
});

progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
});

const repeatBtn = container.querySelector("#repeat-plist");

repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.textContent;
    switch(getText){
        case "repeat":
            repeatBtn.textContent = "repeat_one";
            repeatBtn.setAttribute("title", "song looped");
            break;
        case "repeat_one":
            repeatBtn.textContent = "shuffle";
            repeatBtn.setAttribute("title", "playback shuffled");
            break;
        case "shuffle":
            repeatBtn.textContent = "repeat";
            repeatBtn.setAttribute("title", "playlist looped");
            break;
    }
});

mainAudio.addEventListener("ended", () => {
    let getText = repeatBtn.textContent;
    switch(getText){
        case "repeat":
            nextSong();
            break;
        case "repeat_one":
            mainAudio.currentTime = 0;
            loadMusic(songIndex);
            playSong();
            break;
        case "shuffle":
            let randomIndex = Math.floor((Math.random() * allSongs.length) + 1);
            do{
                randomIndex = Math.floor((Math.random() * allSongs.length) + 1)
            } while (songIndex == randomIndex);
            songIndex = randomIndex;
            loadMusic(songIndex);
            updatePlayingClass();
            playSong();
            break;
        }
});

moreSongsBtn.addEventListener("click", () => {
    songList.classList.toggle("show");
});
closeSongsBtn.addEventListener("click", () => {
    moreSongsBtn.click();
});

const ulTag = container.querySelector("ul");
for(let i = 0; i < allSongs.length; i++){
    let liTag = `<li li-index="${i}">
                    <div class="row">
                        <span>${allSongs[i].name}</span>
                        <p>${allSongs[i].artist}</p>
                    </div>
                    <audio class="${allSongs[i].src}" src="songs/${allSongs[i].src}.mp3"></audio> 
                    <span id="${allSongs[i].src}" class="audio-duration">1.45</span>
                </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);

    let liAudioDurationTag = ulTag.querySelector(`#${allSongs[i].src}`);
    let liAudiotag = ulTag.querySelector(`.${allSongs[i].src}`);
    liAudiotag.addEventListener("loadeddata", () => {
        let duration = liAudiotag.duration;
        let totalMin = Math.floor(duration/60);
        let totalSec = Math.floor(duration%60);
        if(totalSec < 10) totalSec = `0${totalSec}`
        liAudioDurationTag.textContent = `${totalMin}:${totalSec}`
    });
}

const allLiTags = ulTag.querySelectorAll("li");
for(let i = 0; i < allLiTags.length; i++){
    if(allLiTags[i].getAttribute("li-index") == (songIndex-1)){
        allLiTags[i].classList.add("playing");
    }
    allLiTags[i].setAttribute("onclick", "clicked(this)");
}

function clicked(element){
    const allLiTags = ulTag.querySelectorAll("li");
    allLiTags.forEach(li => li.classList.remove("playing"));

    element.classList.add("playing");

    let getLiIndex = parseInt(element.getAttribute("li-index"));
    songIndex = getLiIndex + 1;
    loadMusic(songIndex);
    updatePlayingClass();
    playSong();
}

const volumeSlider = container.querySelector("#volume-slider");
volumeSlider.addEventListener("input", function() {
    mainAudio.volume = this.value;
});

function updatePlayingClass() {
    const allLiTags = ulTag.querySelectorAll("li");
    allLiTags.forEach(li => li.classList.remove("playing"));
    if (allLiTags[songIndex - 1]) {
        allLiTags[songIndex - 1].classList.add("playing");
    }
}