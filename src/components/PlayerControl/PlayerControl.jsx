import MusicBar from '../MusicBar/MusicBar'

import './PlayerControl.css'
import { useRef, useState } from "react"

export default function PlayerControl({ tracks }) {

    // Important: Some tracks doesn't have preview_url, so they won't play
    const [trackProgress, setTrackProgress] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [controlAvailable, setControlAvailable] = useState({
        hasNext: tracks.length > 1 ? true : false,
        hasPrevious: false,
        playable: tracks[0].preview_url ? true : false
    })

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
        if (currentIndex >= tracks.length || tracks.length <= 1) return
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex)
        if (nextIndex === tracks.length) setControlAvailable({ ...controlAvailable, hasNext: false })
        if (!controlAvailable.hasPrevious) setControlAvailable({ ...controlAvailable, hasPrevious: true })

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
        if (currentIndex <= 0 || tracks.length <= 1) return
        const previousIndex = currentIndex - 1
        setCurrentIndex(previousIndex)
        if (previousIndex === 0) setControlAvailable({ ...controlAvailable, hasPrevious: false })
        if (!controlAvailable.hasNext) setControlAvailable({ ...controlAvailable, hasNext: true })

        // First pauses the music and ends the interval
        music.pause()
        clearInterval(intervalId.current)

        // Sets the previous song
        const track = tracks[previousIndex]

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
            <div className='music-controls'>
                <MusicBar trackProgress={trackProgress} />

                <button className={`${controlAvailable.hasPrevious ? "button": null}`} id='previous-track' onClick={previousTrack}><svg fill={`${controlAvailable.hasPrevious ? "white" : "gray"}`} role="img" height="12" width="12" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon"><path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"></path></svg></button>

                <button className={`${controlAvailable.hasNext ? "button": null}`} id='next-track' onClick={nextTrack} ><svg fill={`${controlAvailable.hasNext ? "white" : "gray"}`} role="img" height="12" width="12" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon"><path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"></path></svg></button>

                <button className={`${controlAvailable.playable ? "button": null}`} onClick={toggleMusicPlay}>{isPlaying ? <svg fill={`${controlAvailable.playable ? "white" : "gray"}`} role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon"><path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg> : <svg fill={`${controlAvailable.playable ? "white" : "gray"}`} role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon"><path d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm8.75-4.567a.5.5 0 0 0-.75.433v8.268a.5.5 0 0 0 .75.433l7.161-4.134a.5.5 0 0 0 0-.866L9.75 7.433z"></path></svg>}</button>
            </div>
        </>
    )
}