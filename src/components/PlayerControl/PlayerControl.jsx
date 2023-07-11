import './PlayerControl.css'
import { useState } from "react"
import MusicBar from '../MusicBar/MusicBar'

export default function PlayerControl({ resource }) {

    // Important: Some tracks doesn't have preview_url, so they won't play
    const tracks = resource.tracks.map(t => t.track)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

    const [audio, setAudio] = useState(new Audio(tracks[0].preview_url))

    const toggleAudioPlay = () => {
        if (isPlaying) {
            audio.pause()
            setIsPlaying(false)
        } else {
            audio.play()
            setIsPlaying(true)
        }
    }

    const nextTrack = () => {
        if (currentIndex >= tracks.length) return
        setCurrentIndex((currentIndex) => currentIndex + 1)

        audio.pause()
        const track = tracks[currentIndex + 1]
        const nextMusic = new Audio(track.preview_url)

        if (track?.preview_url) {
            nextMusic.play()
            setAudio(nextMusic)
            setIsPlaying(true)
        }
    }

    const previousTrack = () => {
        if (currentIndex <= 0) return
        setCurrentIndex((currentIndex) => currentIndex - 1)

        audio.pause()
        const track = tracks[currentIndex - 1]
        const previousMusic = new Audio(track.preview_url)

        if (track?.preview_url) {
            previousMusic.play()
            setAudio(previousMusic)
            setIsPlaying(true)
        }
    }

    return (
        <>
            <MusicBar music={audio} />
            <div className='music-controls'>
                <button onClick={previousTrack}>{"<<"}</button>
                <button onClick={toggleAudioPlay}>{isPlaying ? "||" : ">"}</button>
                <button onClick={nextTrack} >{">>"}</button>
            </div>
        </>
    )
}