import "./Player.css"
import { useState } from "react"
import spotify from "../../assets/spotify.svg";

export default function Player({ resource }) {

    const [currentTrack, setCurrentTrack] = useState(resource.tracks[0].track)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [tracks, setTracks] = useState(resource.tracks.map(t => t.track))

    const [isPlaying, setIsPlaying] = useState(false)
    const [trackProgress, setTrackProgress] = useState(0)
    const audioSrc = new Audio(currentTrack.preview_url)

    const playAudio = () => audioSrc.play()
    const pauseAudio = () => audioSrc.pause()
    


    return (
        <div className="screen-container">

            <button>Previous</button>
            <button onClick={playAudio} >Play</button>
            <button onClick={pauseAudio} >Pause</button>


            <div className="right-player-body" >

                {/* <img src={resource.image} alt="Imagen de portada del recurso" width={300} />
            <div>
              <h2>{resource.name}</h2>
              <p>{resource.owner}</p>
            </div>
            <img src={spotify} alt="spotify logo" width={24} className='spotify-logo' /> */}

                {/* <div>{tracks.map((track, i) => {
                return <p key={i}>{track.name}</p>
            })}</div> */}

            </div>

        </div>
    )
}