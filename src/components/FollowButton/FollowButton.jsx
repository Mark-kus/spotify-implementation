import "./FollowButton.css"

export default function FollowButton({ href, qty }) {
    return (
        <p><a href={href} target="_blank" className="follow">Follow {qty}</a></p>
    )
}