import "./Player.css"
import spotify from "../../assets/spotify.svg";
import PlayerControl from "../PlayerControl/PlayerControl";

export default function Player({ resource }) {
    console.log(resource);
    return (
        <div className="container">

            <div className="resource-card">
                <img src={resource.image} alt="Imagen de portada del recurso" width={156} className="resource-logo" />
                <div>
                    <h2>{resource.name}</h2>
                    <p>{resource.owner}</p>
                </div>
                <img src={spotify} alt="spotify logo" width={24} className='spotify-logo' />
            </div>


            {resource.tracks.length > 0 &&
                <PlayerControl tracks={resource.tracks} />
            }

            {resource.tracks.length > 1 &&
                <div className="track-list">
                    {resource.tracks.map((track, i) => {
                        return (
                            <div className="track-container" key={i}>
                                <p>{i + 1}</p>
                                <div className="track-info">
                                    <p>{track.name}</p>
                                    <p>{track.author.join(", ")}</p>
                                </div>
                            </ div>
                        )
                    })}
                </div>
            }

        </div>
    )
}