import "./MusicBar.css";

export default function MusicBar({ trackProgress }) {
    return (
        <div className='progressBar'>
            <div className='backProgressBar'>-</div>
            <div className='frontProgressBar' style={{ width: `${trackProgress}%` }} >-</div>
        </div>
    )
}