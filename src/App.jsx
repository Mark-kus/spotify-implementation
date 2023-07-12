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
      {/* <iframe src="https://open.spotify.com/embed/playlist/7tmqxXppNtc5XvWsBHUcFA?utm_source=generator" width="100%" height="355" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> */}

        {resource?.name ?
            <Player resource={resource} />
          : null}

        <div key={1} className='embedSpotify'>
          <input
            placeholder='Coloca aquí el link'
            className='input-spotify-link'
            value="https://open.spotify.com/playlist/7tmqxXppNtc5XvWsBHUcFA?si=9edd968b9b844f31"
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
