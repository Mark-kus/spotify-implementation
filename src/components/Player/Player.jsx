import "./Player.css"
import spotify from "../../assets/spotify.svg";
import PlayerControl from "../PlayerControl/PlayerControl";

export default function Player({ resource }) {


    return (
        <div className="screen-container">

            <PlayerControl resource={resource} />

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