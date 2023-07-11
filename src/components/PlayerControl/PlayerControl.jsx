import './PlayerControl.css'
import { useState } from "react"

export default function PlayerControl({ resource }) {

    // Important: Some tracks doesn't have preview_url, so they won't play
    const [currentIndex, setCurrentIndex] = useState(0)
    const [tracks, setTracks] = useState(resource.tracks.map(t => t.track))

    const [audio, setAudio] = useState(new Audio(tracks[0].preview_url))

    const [isPlaying, setIsPlaying] = useState(false)
    const [trackProgress, setTrackProgress] = useState(0)

    const playAudio = () => setIsPlaying(true)
    const pauseAudio = () => setIsPlaying(false)

    const nextTrack = () => {
        if (currentIndex >= tracks.length) return

        audio.pause()
        const track = tracks[currentIndex + 1]

        setCurrentIndex((currentIndex) => currentIndex + 1)
        if (track?.preview_url) setAudio(new Audio(track.preview_url))
        if (!isPlaying) setIsPlaying(true)
    }

    const previousTrack = () => {
        if (currentIndex <= 0) return

        audio.pause()
        const track = tracks[currentIndex - 1]

        setCurrentIndex((currentIndex) => currentIndex - 1)
        if (track?.preview_url) setAudio(new Audio(track.preview_url))
        if (!isPlaying) setIsPlaying(true)
    }

    setInterval(() => {
        // {audio.ended && currentIndex < tracks.length ? nextTrack() : null}
        setTrackProgress((audio.currentTime / audio.duration) * 100)
    }, 1000);

    { isPlaying ? audio.play() : audio.pause() }

    return (
        <>
            <div className='progressBar'>
                <div className='backProgressBar'>-</div>
                <div className='frontProgressBar' style={{ width: `${trackProgress}%` }} >-</div>
            </div>
            <button onClick={previousTrack}>Previous</button>
            <button onClick={playAudio} >Play</button>
            <button onClick={pauseAudio} >Pause</button>
            <button onClick={nextTrack} >Next</button>
        </>
    )
}