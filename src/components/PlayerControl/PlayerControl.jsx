import MusicBar from '../MusicBar/MusicBar'
import previous from "../../assets/previous.svg";

import './PlayerControl.css'
import { useRef, useState } from "react"

export default function PlayerControl({ tracks }) {

    // Important: Some tracks doesn't have preview_url, so they won't play
    const [trackProgress, setTrackProgress] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(0)

    const [isPlaying, setIsPlaying] = useState(false)

    const [music, setMusic] = useState(new Audio(tracks[0].preview_url))
    const intervalId = useRef(null)

    const createBarInterval = (audio) => {
        // This Interval will set a percentage of the time playing / total duration of the song
        return setInterval(() => {
            const progress = (audio.currentTime / audio.duration) * 100
            setTrackProgress(progress)
        }, 50);
    }

    const toggleMusicPlay = () => {
        if (isPlaying) {
            // Pauses music and stops the interval
            music.pause()
            clearInterval(intervalId.current)
            setIsPlaying(false)
        } else {
            // Plays music and starts interval
            music.play()
            intervalId.current = createBarInterval(music)
            setIsPlaying(true)
        }
    }

    const nextTrack = () => {
        if (currentIndex >= tracks.length) return
        setCurrentIndex((currentIndex) => currentIndex + 1)

        // First pauses the music and ends the interval
        music.pause()
        clearInterval(intervalId.current)

        // Sets the next song
        const track = tracks[currentIndex + 1]

        // If the song can be played, it does and resets the interval
        if (track?.preview_url) {
            const nextMusic = new Audio(track.preview_url)

            nextMusic.play()
            setMusic(nextMusic)
            setTrackProgress(0)
            intervalId.current = createBarInterval(nextMusic)
            if (!isPlaying) setIsPlaying(true)
        } else {
            setIsPlaying(false)
        }
    }

    const previousTrack = () => {
        if (currentIndex <= 0) return
        setCurrentIndex((currentIndex) => currentIndex - 1)

        // First pauses the music and ends the interval
        music.pause()
        clearInterval(intervalId.current)

        // Sets the previous song
        const track = tracks[currentIndex - 1]

        // If the song can be played, it does and resets the interval
        if (track?.preview_url) {
            const previousMusic = new Audio(track.preview_url)

            previousMusic.play()
            setMusic(previousMusic)
            setTrackProgress(0)
            intervalId.current = createBarInterval(previousMusic)
            if (!isPlaying) setIsPlaying(true)
        } else {
            setIsPlaying(false)
        }
    }


    return (
        <>
            <MusicBar trackProgress={trackProgress} />
            <div className='music-controls'>
                <button onClick={previousTrack}>
                    <img src={previous} alt="previous-track" />
                </button>
                <button onClick={toggleMusicPlay}>{isPlaying ? "||" : ">"}</button>
                <button onClick={nextTrack} >{">>"}</button>
            </div>
        </>
    )
}