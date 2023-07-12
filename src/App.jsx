import './App.css'
import { useState } from 'react'
import getResource from './utils/getResource'
import Player from "./components/Player/Player";

function App() {
  const [resource, setResource] = useState()

  async function search(e) {
    // Request the resource
    setResource(await getResource(e.target.value))
  }

  return (
    <>
      <div className='container'>
        <div>
          <iframe style={{ "border-radius": "12px" }} src="https://open.spotify.com/embed/playlist/7tmqxXppNtc5XvWsBHUcFA?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
          {resource?.name ?
            <Player resource={resource} />
            : null}
        </div>

        <div key={1} className='embedSpotify'>
          <input
            placeholder='Coloca aquí el link'
            className='input-spotify-link'
            value="https://open.spotify.com/playlist/7tmqxXppNtc5XvWsBHUcFA?si=70e6fd7632394ccb"
            onKeyDown={
              (e) => {
                if (e.key === "Enter" && e.target.value.length > 0) {
                  search(e)
                }
              }
            }
          />
        </div>
      </div>
    </>
  )
}

export default App
