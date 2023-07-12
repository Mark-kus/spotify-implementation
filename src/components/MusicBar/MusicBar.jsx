import "./MusicBar.css";
import { useEffect, useState } from "react";

export default function MusicBar({ music }) {
    const [trackProgress, setTrackProgress] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const progress = (music.currentTime / music.duration) * 100
            setTrackProgress(progress)
        }, 1000);
    }, [])

    return (
        <div className='progressBar'>
            <div className='backProgressBar'>-</div>
            <div className='frontProgressBar' style={{ width: `${trackProgress}%` }} >-</div>
        </div>
    )
}