import "./MusicBar.css"
import { useState } from "react";

export default function MusicBar({ music }) {
    const [trackProgress, setTrackProgress] = useState(0)

    setInterval(() => {
        setTrackProgress((music.currentTime / music.duration) * 100)
    }, 1000);

    return (
        <div className='progressBar'>
            <div className='backProgressBar'>-</div>
            <div className='frontProgressBar' style={{ width: `${trackProgress}%` }} >-</div>
        </div>
    )
}