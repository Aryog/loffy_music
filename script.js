console.log("Welcome to app")
let myProgressBar = document.getElementById('myProgressBar');
let songIndex = 1;
let audioElement = new Audio(`songs/${songIndex}.mp3`)
let masterplay = document.getElementById("masterplay");
let gif = document.getElementById('gif')
let backgif = document.getElementById('container')
let s_name = document.getElementById('song_name')


const songName = [
    "Aankhon Mein Teri Ajab Si ...",
    "Heat Waves - Glass Animals Song ...",
    "Dekha Hazaro Dafa ...",
    "Birsiney Hau Ki ... The Elements ...",
    "Pehli Nazar Mein",
    "Let Me Down Slowly x Main Dhoondne Ko ...",
    "Sayad Kabhi Mai Keh Saku ...",
    "Aau Timi Yo Jindagima ...",
    "Tu Jaane Na ...",
    "Runaway x Kaise Hua_Lofi Mashup ...",
]
s_name.textContent = `${songName[songIndex-1]}`;

// audioElement.play();
masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})
audioElement.addEventListener("timeupdate",()=>{
    console.log("Progress Changed!");
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress;
    document.getElementById('duration').textContent = `${parseInt(audioElement.currentTime/60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })}:${parseInt(audioElement.currentTime%60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })}`;

      if(myProgressBar.value == 100)
      {
        console.log("forward clicked")
        if(songIndex<10)
        {
            songIndex+=1;
            s_name.textContent = `${songName[songIndex-1]}`
            audioElement.pause();
            audioElement.src = `songs/${songIndex}.mp3`;
            console.log(songIndex);
            audioElement.currentTime = 0;
            audioElement.play();
        }
      }
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
    console.log(audioElement.currentTime)
})



// making the the play pause workable
document.getElementById('forward').addEventListener('click',()=>{
    console.log("forward clicked");
    if(songIndex===10)
    {
        songIndex = 1;
    }
    if(songIndex<10)
    {
        songIndex+=1;
        s_name.textContent = `${songName[songIndex-1]}`
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        backgif.style.backgroundImage = `url("songs/${songIndex}.gif")`
        audioElement.pause();
        audioElement.src = `songs/${songIndex}.mp3`;
        console.log(songIndex);
        audioElement.currentTime = 0;
        audioElement.play();
        backgif.style.backgroundImage = URL`songs/${songIndex}.gif`
    }
})
document.getElementById('previous').addEventListener('click',()=>{
    console.log("previous clicked");
    console.log(songIndex);
    if(songIndex<10 && songIndex>1)
    {
        songIndex-=1;
        gif.style.opacity = 1;
        s_name.textContent = `${songName[songIndex-1]}`
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        backgif.style.backgroundImage = `url("songs/${songIndex}.gif")`
        audioElement.pause();
        audioElement.src = `songs/${songIndex}.mp3`;
        console.log(songIndex);
        audioElement.currentTime = 0;
        audioElement.play();
    }
})
