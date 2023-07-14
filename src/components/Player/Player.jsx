import "./Player.css"
import PlayerControl from "../PlayerControl/PlayerControl";
import msConverter from "../../utils/msConverter";
import FollowButton from "../FollowButton/FollowButton";

export default function Player({ resource }) {
    return (
        <>
            <div className="resource-card">
                <img src={resource.image} alt="Imagen de portada del recurso" width={156} className="resource-logo" />
                <div className="top-card">
                    <a className="link-to" target="_blank" href={resource.url}><h2>{resource.name}</h2></a>
                    {isNaN(Number(resource.owner)) ? <p className="mute">{resource.owner}</p> : <FollowButton href={resource.url} qty={resource.owner} />}
                    <div className="genres">
                        {resource.genres.map((genre, i) => {
                            const shownGenre = genre.slice(0, 1).toUpperCase() + genre.slice(1)
                            return (
                                <span key={i} className="genre mute">{shownGenre}</span>
                            )
                        })}
                    </div>
                </div>

                <div className="controls">
                    <svg className="spotify-logo" fill="white" role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon"><path d="M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22zm5.045 15.866a.686.686 0 0 1-.943.228c-2.583-1.579-5.834-1.935-9.663-1.06a.686.686 0 0 1-.306-1.337c4.19-.958 7.785-.546 10.684 1.226a.686.686 0 0 1 .228.943zm1.346-2.995a.858.858 0 0 1-1.18.282c-2.956-1.817-7.464-2.344-10.961-1.282a.856.856 0 0 1-1.11-.904.858.858 0 0 1 .611-.737c3.996-1.212 8.962-.625 12.357 1.462a.857.857 0 0 1 .283 1.179zm.116-3.119c-3.546-2.106-9.395-2.3-12.78-1.272a1.029 1.029 0 0 1-.597-1.969c3.886-1.18 10.345-.952 14.427 1.471a1.029 1.029 0 0 1-1.05 1.77z"></path></svg>

                    <div className="controles-musicales">
                        {resource.tracks.length > 0 &&
                            <PlayerControl tracks={resource.tracks} />
                        }
                    </div>
                </div>
            </div>



            {resource.tracks.length > 1 &&
                <div className="track-list">
                    {resource.tracks.map((track, i) => {
                        const showTime = msConverter(track.time)
                        return (
                            <div className="track-container" key={i}>
                                <p className="mute">{i + 1}</p>
                                <div className="track-info">
                                    <p>{track.name}</p>
                                    <p className="mute">{track.author.join(", ")}</p>
                                </div>
                                <p className="mute track-time">{showTime}</p>
                            </ div>
                        )
                    })}
                </div>
            }
        </>
    )
}