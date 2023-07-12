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
        return setInterval(() => {
            const progress = (audio.currentTime / audio.duration) * 100
            setTrackProgress(progress)
        }, 50);
    }

    const toggleMusicPlay = () => {
        if (isPlaying) {
            music.pause()
            clearInterval(intervalId.current)
            setIsPlaying(false)
        } else {
            music.play()
            intervalId.current = createBarInterval(music)
            setIsPlaying(true)
        }
    }

    const nextTrack = () => {
        if (currentIndex >= tracks.length) return
        setCurrentIndex((currentIndex) => currentIndex + 1)

        music.pause()
        clearInterval(intervalId.current)

        const track = tracks[currentIndex + 1]
        const nextMusic = new Audio(track.preview_url)

        if (track?.preview_url) {
            nextMusic.play()
            setMusic(nextMusic)
            setTrackProgress(0)
            intervalId.current = createBarInterval(nextMusic)
            if (!isPlaying) setIsPlaying(true)
        }
    }

    const previousTrack = () => {
        if (currentIndex <= 0) return
        setCurrentIndex((currentIndex) => currentIndex - 1)

        music.pause()
        clearInterval(intervalId.current)

        const track = tracks[currentIndex - 1]
        const previousMusic = new Audio(track.preview_url)

        if (track?.preview_url) {
            previousMusic.play()
            setMusic(previousMusic)
            setTrackProgress(0)
            intervalId.current = createBarInterval(previousMusic)
            if (!isPlaying) setIsPlaying(true)
        }
    }


    return (
        <>
            <div className='progressBar'>
                <div className='backProgressBar'>-</div>
                <div className='frontProgressBar' style={{ width: `${trackProgress}%` }} >-</div>
            </div>
            <div className='music-controls'>
                <button onClick={previousTrack}>{"<<"}</button>
                <button onClick={toggleMusicPlay}>{isPlaying ? "||" : ">"}</button>
                <button onClick={nextTrack} >{">>"}</button>
            </div>
        </>
    )
}