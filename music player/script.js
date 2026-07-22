const songs = [

{
title:"Dreams",
artist:"Artist One",
src:"music/song1.mp3",
cover:"images/cover1.jpg"
},

{
title:"Night Sky",
artist:"Artist Two",
src:"music/song2.mp3",
cover:"images/cover2.jpg"
},

{
title:"Summer",
artist:"Artist Three",
src:"music/song3.mp3",
cover:"images/cover3.jpg"
}

];

const audio=document.getElementById("audio");

const title=document.getElementById("title");
const artist=document.getElementById("artist");
const cover=document.getElementById("cover");

const playBtn=document.getElementById("play");
const nextBtn=document.getElementById("next");
const prevBtn=document.getElementById("prev");

const progress=document.getElementById("progress");

const currentTime=document.getElementById("currentTime");
const duration=document.getElementById("duration");

const volume=document.getElementById("volume");

const playlist=document.getElementById("playlist");

let songIndex=0;

function loadSong(index){

audio.src=songs[index].src;

title.innerText=songs[index].title;

artist.innerText=songs[index].artist;

cover.src=songs[index].cover;

document.querySelectorAll("#playlist li").forEach(item=>{
item.classList.remove("active");
});

playlist.children[index].classList.add("active");

}

songs.forEach((song,index)=>{

const li=document.createElement("li");

li.innerText=song.title+" - "+song.artist;

li.onclick=()=>{

songIndex=index;

loadSong(songIndex);

playSong();

}

playlist.appendChild(li);

});

loadSong(songIndex);

function playSong(){

audio.play();

playBtn.innerHTML='<i class="fa-solid fa-pause"></i>';

}

function pauseSong(){

audio.pause();

playBtn.innerHTML='<i class="fa-solid fa-play"></i>';

}

playBtn.onclick=()=>{

if(audio.paused){

playSong();

}
else{

pauseSong();

}

};

nextBtn.onclick=()=>{

songIndex++;

if(songIndex>=songs.length){

songIndex=0;

}

loadSong(songIndex);

playSong();

};

prevBtn.onclick=()=>{

songIndex--;

if(songIndex<0){

songIndex=songs.length-1;

}

loadSong(songIndex);

playSong();

};

audio.addEventListener("loadedmetadata",()=>{

progress.max=Math.floor(audio.duration);

duration.innerText=formatTime(audio.duration);

});

audio.addEventListener("timeupdate",()=>{

progress.value=Math.floor(audio.currentTime);

currentTime.innerText=formatTime(audio.currentTime);

});

progress.oninput=()=>{

audio.currentTime=progress.value;

};

volume.oninput=()=>{

audio.volume=volume.value;

};

audio.addEventListener("ended",()=>{

songIndex++;

if(songIndex>=songs.length){

songIndex=0;

}

loadSong(songIndex);

playSong();

});

function formatTime(time){

let min=Math.floor(time/60);

let sec=Math.floor(time%60);

if(sec<10){

sec="0"+sec;

}

return min+":"+sec;

}