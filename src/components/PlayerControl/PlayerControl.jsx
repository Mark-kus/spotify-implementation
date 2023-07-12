import './PlayerControl.css'
import { useState } from "react"
import MusicBar from '../MusicBar/MusicBar'

export default function PlayerControl({ tracks }) {

    // Important: Some tracks doesn't have preview_url, so they won't play
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

    const [music, setMusic] = useState(new Audio(tracks[0].preview_url))

    const toggleMusicPlay = () => {
        if (isPlaying) {
            music.pause()
            setIsPlaying(false)
        } else {
            music.play()
            setIsPlaying(true)
        }
    }

    const nextTrack = () => {
        if (currentIndex >= tracks.length) return
        setCurrentIndex((currentIndex) => currentIndex + 1)

        music.pause()
        const track = tracks[currentIndex + 1]
        const nextMusic = new Audio(track.preview_url)

        if (track?.preview_url) {
            nextMusic.play()
            setMusic(nextMusic)
            if (!isPlaying) setIsPlaying(true)
        }
    }

    const previousTrack = () => {
        if (currentIndex <= 0) return
        setCurrentIndex((currentIndex) => currentIndex - 1)

        music.pause()
        const track = tracks[currentIndex - 1]
        const previousMusic = new Audio(track.preview_url)

        if (track?.preview_url) {
            previousMusic.play()
            setMusic(previousMusic)
            if (!isPlaying) setIsPlaying(true)
        }
    }

    return (
        <>
            <MusicBar music={music} />
            <div className='music-controls'>
                <button onClick={previousTrack}>{"<<"}</button>
                <button onClick={toggleMusicPlay}>{isPlaying ? "||" : ">"}</button>
                <button onClick={nextTrack} >{">>"}</button>
            </div>
        </>
    )
}