import "./Player.css"
import spotify from "../../assets/spotify.svg";
import PlayerControl from "../PlayerControl/PlayerControl";

export default function Player({ resource }) {
    console.log(resource);
    return (
        <div className="container">

            <div className="resource-card">
                <img src={resource.image} alt="Imagen de portada del recurso" width={200} />
                <div>
                    <h2>{resource.name}</h2>
                    <p>{resource.owner}</p>
                </div>
                <img src={spotify} alt="spotify logo" width={24} className='spotify-logo' />
            </div>

            <PlayerControl tracks={resource.tracks} />

            <div>
                {resource.tracks.map((track, i) => {
                    return <p key={i}>{track.name}</p>
                })}
            </div>

        </div>
    )
}