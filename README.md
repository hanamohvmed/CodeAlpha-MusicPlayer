# 🎵 Music Player Web App

A clean and interactive web-based Music Player built using **HTML**, **CSS**, and **JavaScript**. This player allows users to listen to a playlist of songs with essential controls like play/pause, skip, repeat modes, seekbar, volume control, and a dynamic playlist UI.

## 🚀 Features

- 🎧 Play/Pause, Next, and Previous track controls  
- 🔁 Three playback modes: repeat playlist, repeat single, shuffle  
- 📃 Playlist display with song names, artists, and duration  
- 📊 Seekable progress bar with current time and total duration  
- 🔊 Volume control slider  
- 🎼 Album artwork and animated spinning effect while playing  
- 🕹️ Responsive layout with smooth interaction  

## 🛠️ Tech Stack

- **HTML**
- **CSS**
- **JavaScript**

## 📝 Customization if you want!

To add more songs:

1. Add the `.mp3` to `songs/`
2. Add the `.png` image to `images/`
3. Add a new entry in the `allSongs` array inside `main.js` like:

```js
{
    name: "Your Song Name",
    artist: "Artist Name",
    img: "image-file-name",
    src: "audio-file-name"
}
