import "./FollowButton.css"

export default function FollowButton({ href, qty }) {
    return (
        <p><a href={href} className="follow">Follow {qty}</a></p>
    )
}